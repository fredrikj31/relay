import { CommonQueryMethods } from "slonik";
import { ContactRequest } from "../../../types/contact";
import { BadRequestError, UnauthorizedError } from "../../../errors/client";
import { updateContactRequest } from "../../../services/database/queries/contact/updateContactRequest";
import { createContact } from "../../../services/database/queries/contact/createContact";

interface AcceptOrDeclineContactRequestHandlerOptions {
  database: CommonQueryMethods;
  status: "accepted" | "declined";
  accountId: string | undefined;
  requestId: string;
}
export const acceptOrDeclineContactRequest = async ({
  database,
  status,
  accountId,
  requestId,
}: AcceptOrDeclineContactRequestHandlerOptions): Promise<ContactRequest> => {
  if (!accountId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  if (status === "accepted") {
    const contactRequest = database.transaction(async (transaction) => {
      const contactRequest = await updateContactRequest(transaction, {
        accountId,
        requestId,
        status: "ACCEPTED",
      });

      await createContact(transaction, {
        accountId: contactRequest.senderAccountId,
        contactId: contactRequest.receiverAccountId,
      });
      await createContact(transaction, {
        accountId: contactRequest.receiverAccountId,
        contactId: contactRequest.senderAccountId,
      });

      return contactRequest;
    });
    return contactRequest;
  }

  if (status === "declined") {
    const contactRequest = database.transaction(async (transaction) => {
      const contactRequest = await updateContactRequest(transaction, {
        accountId,
        requestId,
        status: "DECLINED",
      });

      return contactRequest;
    });
    return contactRequest;
  }

  throw new BadRequestError({
    code: "contact-request-accept-decline-status-unknown",
    message: 'The provided status was not either "accepted" or "declined"',
  });
};
