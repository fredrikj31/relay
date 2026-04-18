import {
  CommonQueryMethods,
  ForeignKeyIntegrityConstraintViolationError,
  sql,
} from "slonik";
import {
  ContactRequest,
  ContactRequestSchema,
} from "../../../../types/contact";
import { randomUUID } from "crypto";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { BadRequestError } from "../../../../errors/client";

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
    if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
      if (
        error.constraint === "contact_request_receiver_account_id_references"
      ) {
        throw new BadRequestError({
          code: "contact-request-account-id-does-not-exists",
          message: "Could not find a account with that id",
        });
      }
    }

    logger.error(error, "Error while creating contact request.");
    throw new InternalServerError({
      code: "unknown-error-creating-contact-request",
      message: "Unknown error when trying to create contact request",
    });
  }
};
