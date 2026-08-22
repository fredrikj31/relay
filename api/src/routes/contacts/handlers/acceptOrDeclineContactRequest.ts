import { ContactRequest } from "../../../services/drizzle-database/schemas/contactRequest";
import { UnauthorizedError } from "../../../errors/client";
import { Database } from "../../../services/drizzle-database/client";
import { updateContactRequest } from "../../../services/drizzle-database/queries/contactRequest/updateContactRequest";
import { createContact } from "../../../services/drizzle-database/queries/contact/createContact";

interface AcceptOrDeclineContactRequestHandlerOptions {
  database: Database;
  status: "accepted" | "declined";
  userId: string | undefined;
  requestId: string;
}
export const acceptOrDeclineContactRequest = async ({
  database,
  status,
  userId,
  requestId,
}: AcceptOrDeclineContactRequestHandlerOptions): Promise<ContactRequest> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  switch (status) {
    case "accepted": {
      const contactRequest = await database.transaction(async (transaction) => {
        const contactRequest = await updateContactRequest(transaction, {
          id: requestId,
          receiverUserId: userId,
          status: "ACCEPTED",
        });

        await Promise.all([
          createContact(transaction, {
            userId: contactRequest.senderUserId,
            contactId: contactRequest.receiverUserId,
          }),
          createContact(transaction, {
            userId: contactRequest.receiverUserId,
            contactId: contactRequest.senderUserId,
          }),
        ]);

        return contactRequest;
      });

      return contactRequest;
    }
    case "declined": {
      const contactRequest = await database.transaction(async (transaction) => {
        const contactRequest = await updateContactRequest(transaction, {
          id: requestId,
          receiverUserId: userId,
          status: "DECLINED",
        });

        return contactRequest;
      });

      return contactRequest;
    }
    default:
      return status satisfies never;
  }
};
