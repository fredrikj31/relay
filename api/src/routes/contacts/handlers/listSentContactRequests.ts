import { CommonQueryMethods } from "slonik";
import { ContactRequest } from "../../../types/contact";
import { User } from "../../../types/user";
import { listSentContactRequests } from "../../../services/database/queries/contact/listSentContactRequests";
import { UnauthorizedError } from "../../../errors/client";

interface ListSentContactRequestsHandlerOptions {
  database: CommonQueryMethods;
  userId: string | undefined;
}
export const listSentContactRequestsHandler = async ({
  database,
  userId,
}: ListSentContactRequestsHandlerOptions): Promise<
  (Omit<ContactRequest, "senderAccountId"> & {
    user: User;
  })[]
> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const sentContactRequests = await listSentContactRequests(database, {
    accountId: userId,
  });

  return [...sentContactRequests];
};
