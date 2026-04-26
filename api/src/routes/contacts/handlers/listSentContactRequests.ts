import { CommonQueryMethods } from "slonik";
import { ContactRequest } from "../../../types/contact";
import { Account } from "../../../types/account";
import { listSentContactRequests } from "../../../services/database/queries/contact/listSentContactRequests";
import { UnauthorizedError } from "../../../errors/client";

interface ListSentContactRequestsHandlerOptions {
  database: CommonQueryMethods;
  accountId: string | undefined;
}
export const listSentContactRequestsHandler = async ({
  database,
  accountId,
}: ListSentContactRequestsHandlerOptions): Promise<
  (Omit<ContactRequest, "senderAccountId"> & {
    account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
  })[]
> => {
  if (!accountId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const sentContactRequests = await listSentContactRequests(database, {
    accountId,
  });

  return [...sentContactRequests];
};
