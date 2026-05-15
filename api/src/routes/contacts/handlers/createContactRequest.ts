import { CommonQueryMethods } from "slonik";
import { ContactRequest } from "../../../types/contact";
import { createContactRequest } from "../../../services/database/queries/contact/createContactRequest";
import { BadRequestError, UnauthorizedError } from "../../../errors/client";
import { getAccountByUsername } from "../../../services/database/queries/user/getAccountByUsername";

interface CreateContactRequestHandlerOptions {
  database: CommonQueryMethods;
  accountId: string | undefined;
  username: string;
}
export const createContactRequestHandler = async ({
  database,
  accountId,
  username,
}: CreateContactRequestHandlerOptions): Promise<ContactRequest> => {
  if (!accountId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const contactAccount = await getAccountByUsername(database, { username });

  if (accountId === contactAccount.id) {
    throw new BadRequestError({
      code: "contact-request-contact-id-matches-account-id",
      message: "Contact id matches the account id from the access token",
    });
  }

  const contactRequest = await createContactRequest(database, {
    accountId,
    contactId: contactAccount.id,
  });

  return contactRequest;
};
