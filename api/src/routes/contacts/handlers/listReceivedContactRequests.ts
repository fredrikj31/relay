import { UnauthorizedError } from "../../../errors/client";
import { ContactRequest } from "../../../services/drizzle-database/schemas/contactRequest";
import { listReceivedContactRequests } from "../../../services/drizzle-database/queries/contactRequest/listReceivedContactRequests";
import { User } from "../../../services/drizzle-database/schemas/auth";
import { Database } from "../../../services/drizzle-database/client";

interface ListReceivedContactRequestsHandlerOptions {
  database: Database;
  userId: string | undefined;
}
export const listReceivedContactRequestsHandler = async ({
  database,
  userId,
}: ListReceivedContactRequestsHandlerOptions): Promise<
  { contactRequest: ContactRequest; user: User }[]
> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const receivedContactRequests = await listReceivedContactRequests(database, {
    receiverUserId: userId,
  });

  return receivedContactRequests;
};
