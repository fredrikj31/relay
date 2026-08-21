import { UnauthorizedError } from "../../../errors/client";
import { ContactRequest } from "../../../services/drizzle-database/schemas/contact";
import { deleteContactRequest } from "../../../services/drizzle-database/queries/contact/deleteContactRequest";
import { Database } from "../../../services/drizzle-database/client";

interface DeleteContactRequestHandlerOptions {
  database: Database;
  userId: string | undefined;
  requestId: string;
}
export const deleteContactRequestHandler = async ({
  database,
  userId,
  requestId,
}: DeleteContactRequestHandlerOptions): Promise<ContactRequest> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const contactRequest = await deleteContactRequest(database, {
    id: requestId,
    senderUserId: userId,
  });

  return contactRequest;
};
