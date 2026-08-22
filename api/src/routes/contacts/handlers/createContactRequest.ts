import { BadRequestError, UnauthorizedError } from "../../../errors/client";
import { getUserByUsername } from "../../../services/drizzle-database/queries/user/getUserByUsername";
import { ContactRequest } from "../../../services/drizzle-database/schemas/contactRequest";
import { createContactRequest } from "../../../services/drizzle-database/queries/contactRequest/createContactRequest";
import { Database } from "../../../services/drizzle-database/client";

interface CreateContactRequestHandlerOptions {
  database: Database;
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
    senderUserId: userId,
    receiverUserId: contactUser.id,
  });

  return contactRequest;
};
