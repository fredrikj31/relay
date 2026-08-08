import { CommonQueryMethods } from "slonik";
import { UnauthorizedError } from "../../../errors/client";
import { deleteContactRequest } from "../../../services/database/queries/contact/deleteContactRequest";
import { ContactRequest } from "../../../types/contact";

interface DeleteContactRequestHandlerOptions {
  database: CommonQueryMethods;
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
    accountId: userId,
    requestId,
  });

  return contactRequest;
};
