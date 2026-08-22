import { and, eq, isNull } from "drizzle-orm";
import { Database } from "../../client";
import { user, User } from "../../schemas/auth";
import { contact, Contact } from "../../schemas/contact";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

export const listContacts = async (
  database: Database,
  { userId }: Pick<Contact, "userId">,
): Promise<{ contact: Contact; user: User }[]> => {
  const rows = await database
    .select()
    .from(contact)
    .innerJoin(user, eq(contact.contactId, user.id))
    .where(and(eq(contact.contactId, userId), isNull(contact.deletedAt)))
    .catch((error) => {
      logger.error(error, "Error while listing contact.");
      throw new InternalServerError({
        code: "unknown-error-listing-contact",
        message: "Unknown error when trying to create contact",
      });
    });

  const mappedRows = rows.map((item) => ({
    contact: item.contact,
    user: item.user,
  }));

  return mappedRows;
};
