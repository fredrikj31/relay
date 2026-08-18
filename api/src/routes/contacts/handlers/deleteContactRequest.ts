import { UnauthorizedError } from "../../../errors/client";
import { ContactRequest } from "../../../services/drizzle-database/schemas/contact";
import { deleteContactRequest } from "../../../services/drizzle-database/queries/contact/deleteContactRequest";

interface DeleteContactRequestHandlerOptions {
  userId: string | undefined;
  requestId: string;
}
export const deleteContactRequestHandler = async ({
  userId,
  requestId,
}: DeleteContactRequestHandlerOptions): Promise<ContactRequest> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const contactRequest = await deleteContactRequest({
    id: requestId,
    senderUserId: userId,
  });

  return contactRequest;
};
