import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { Contact, ContactSchema } from "../../../../types/contact";
import { randomUUID } from "crypto";

interface CreateContactOptions {
  accountId: string;
  contactId: string;
}
export const createContact = async (
  database: CommonQueryMethods,
  { accountId, contactId }: CreateContactOptions,
): Promise<Contact> => {
  try {
    return await database.one(sql.type(ContactSchema)`
      INSERT INTO contact
      (
        id, 
        created_at, 
        updated_at, 
        deleted_at, 
        account_id, 
        contact_id
      )
      VALUES
      (
        ${randomUUID()},
        ${new Date().toISOString()},
        null,
        null,
        ${accountId},
        ${contactId}
      )
      RETURNING *;
    `);
  } catch (error) {
    logger.error(error, "Error while creating contact in database.");
    throw new InternalServerError({
      code: "unknown-error-creating-contact",
      message: "Unknown error when trying to create contact from database",
    });
  }
};
