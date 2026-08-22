import { randomUUID } from "crypto";
import { Database } from "../../client";
import { contact, Contact } from "../../schemas/contact";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

export const createContact = async (
  database: Database,
  { userId, contactId }: Pick<Contact, "userId" | "contactId">,
): Promise<Contact> => {
  const result = await database
    .insert(contact)
    .values({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      userId,
      contactId,
    })
    .returning()
    .catch((error) => {
      logger.error(error, "Error while creating contact.");
      throw new InternalServerError({
        code: "unknown-error-creating-contact",
        message: "Unknown error when trying to create contact",
      });
    });

  const row = result[0];
  if (!row) {
    throw new InternalServerError({
      code: "error-creating-contact-no-rows",
      message:
        "Error creating contact. Database query did not return any rows.",
    });
  }

  return row;
};
