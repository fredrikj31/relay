import { ContactRequest } from "../../../services/drizzle-database/schemas/contactRequest";
import { User } from "../../../services/drizzle-database/schemas/auth";
import { listSentContactRequests } from "../../../services/drizzle-database/queries/contactRequest/listSentContactRequests";
import { UnauthorizedError } from "../../../errors/client";
import { Database } from "../../../services/drizzle-database/client";

interface ListSentContactRequestsHandlerOptions {
  database: Database;
  userId: string | undefined;
}
export const listSentContactRequestsHandler = async ({
  database,
  userId,
}: ListSentContactRequestsHandlerOptions): Promise<
  { contactRequest: ContactRequest; user: User }[]
> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const sentContactRequests = await listSentContactRequests(database, {
    senderUserId: userId,
  });

  return sentContactRequests;
};
