import { CommonQueryMethods, sql } from "slonik";
import {
  ContactRequest,
  ContactRequestSchema,
} from "../../../../types/contact";
import { randomUUID } from "crypto";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface CreateContactRequestOptions {
  accountId: string;
  contactId: string;
}
export const createContactRequest = async (
  database: CommonQueryMethods,
  { accountId, contactId }: CreateContactRequestOptions,
): Promise<ContactRequest> => {
  try {
    return await database.one(sql.type(ContactRequestSchema)`
      INSERT INTO
        contact_request
      (
        id,
        created_at,
        updated_at,
        deleted_at,
        sender_account_id,
        receiver_account_id,
        status
      )
      VALUES
      (
        ${randomUUID()},
        ${new Date().toISOString()},
        null,
        null,
        ${accountId},
        ${contactId},
        'PENDING'
      )
      RETURNING *;
    `);
  } catch (error) {
    logger.error(error, "Error while creating contact request.");
    throw new InternalServerError({
      code: "unknown-error-creating-contact-request",
      message: "Unknown error when trying to create contact request",
    });
  }
};
