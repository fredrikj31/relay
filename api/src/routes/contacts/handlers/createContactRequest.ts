import { CommonQueryMethods } from "slonik";
import { ContactRequest } from "../../../types/contact";
import { createContactRequest } from "../../../services/database/queries/contact/createContactRequest";
import { BadRequestError, UnauthorizedError } from "../../../errors/client";
import { getUserByUsername } from "../../../services/database/queries/user/getUserByUsername";

interface CreateContactRequestHandlerOptions {
  database: CommonQueryMethods;
  userId: string | undefined;
  username: string;
}
export const createContactRequestHandler = async ({
  database,
  userId,
  username,
}: CreateContactRequestHandlerOptions): Promise<ContactRequest> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const contactUser = await getUserByUsername(database, { username });

  if (userId === contactUser.id) {
    throw new BadRequestError({
      code: "contact-request-contact-id-matches-account-id",
      message: "Contact id matches the account id from the access token",
    });
  }

  const contactRequest = await createContactRequest(database, {
    accountId: userId,
    contactId: contactUser.id,
  });

  return contactRequest;
};
