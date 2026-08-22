import { UnauthorizedError } from "../../../errors/client";
import { Contact } from "../../../services/drizzle-database/schemas/contact";
import { User } from "../../../services/drizzle-database/schemas/auth";
import { listContacts } from "../../../services/drizzle-database/queries/contact/listContacts";
import { Database } from "../../../services/drizzle-database/client";

interface listContactsHandlerOptions {
  database: Database;
  userId: string | undefined;
}
export const listContactsHandler = async ({
  database,
  userId,
}: listContactsHandlerOptions): Promise<{ contact: Contact; user: User }[]> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const contacts = await listContacts(database, {
    userId,
  });

  return [...contacts];
};
