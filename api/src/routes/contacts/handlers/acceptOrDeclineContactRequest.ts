import { ContactRequest } from "../../../services/drizzle-database/schemas/contact";
import { UnauthorizedError } from "../../../errors/client";
import { databaseClient } from "../../../services/drizzle-database/client";
import { updateContactRequest } from "../../../services/drizzle-database/queries/contact/updateContactRequest";

interface AcceptOrDeclineContactRequestHandlerOptions {
  status: "accepted" | "declined";
  userId: string | undefined;
  requestId: string;
}
export const acceptOrDeclineContactRequest = async ({
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
      const contactRequest = await databaseClient.transaction(
        async (transaction) => {
          const contactRequest = await updateContactRequest({
            databaseClient: transaction,
            id: requestId,
            receiverUserId: userId,
            status: "ACCEPTED",
          });

          // TODO: Create contact

          return contactRequest;
        },
      );

      return contactRequest;
    }
    case "declined": {
      const contactRequest = await databaseClient.transaction(
        async (transaction) => {
          const contactRequest = await updateContactRequest({
            databaseClient: transaction,
            id: requestId,
            receiverUserId: userId,
            status: "DECLINED",
          });

          return contactRequest;
        },
      );

      return contactRequest;
    }
    default:
      return status satisfies never;
  }
};
