import { CommonQueryMethods } from "slonik";
import { ContactRequest } from "../../../types/contact";
import { User } from "../../../types/user";
import { listReceivedContactRequests } from "../../../services/database/queries/contact/listReceivedContactRequests";
import { UnauthorizedError } from "../../../errors/client";

interface ListReceivedContactRequestsHandlerOptions {
  database: CommonQueryMethods;
  userId: string | undefined;
}
export const listReceivedContactRequestsHandler = async ({
  database,
  userId,
}: ListReceivedContactRequestsHandlerOptions): Promise<
  (Omit<ContactRequest, "receiverAccountId"> & {
    user: User;
  })[]
> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const receivedContactRequests = await listReceivedContactRequests(database, {
    accountId: userId,
  });

  return [...receivedContactRequests];
};
