import { CommonQueryMethods } from "slonik";
import { ContactRequest } from "../../../types/contact";
import { Account } from "../../../types/account";
import { listReceivedContactRequests } from "../../../services/database/queries/contact/listReceivedContactRequests";
import { UnauthorizedError } from "../../../errors/client";

interface ListReceivedContactRequestsHandlerOptions {
  database: CommonQueryMethods;
  accountId: string | undefined;
}
export const listReceivedContactRequestsHandler = async ({
  database,
  accountId,
}: ListReceivedContactRequestsHandlerOptions): Promise<
  (Omit<ContactRequest, "receiverAccountId"> & {
    account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
  })[]
> => {
  if (!accountId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const receivedContactRequests = await listReceivedContactRequests(database, {
    accountId,
  });

  return [...receivedContactRequests];
};
