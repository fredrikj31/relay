import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import {
  ContactRequestSchema,
  ContactRequestStatus,
} from "../../../../types/contact";
import { NotFoundError } from "../../../../errors/client";

interface UpdateContactRequestOptions {
  accountId: string;
  requestId: string;
  status: ContactRequestStatus;
}

export const updateContactRequest = async (
  database: CommonQueryMethods,
  { accountId, requestId, status }: UpdateContactRequestOptions,
) => {
  try {
    return await database.one(sql.type(ContactRequestSchema)`
      UPDATE
        contact_request
      SET
        status = ${status},
        updated_at = ${new Date().toISOString()}
      WHERE
        id = ${requestId}
      AND
        receiver_account_id = ${accountId}
      AND
        deleted_at IS NULL
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "update-contact-request-by-id-not-found",
        message: "Contact request with specified id was not found",
      });
    }

    logger.error(error, "Error while updating contact request in database.");
    throw new InternalServerError({
      code: "unknown-error-updating-contact-request",
      message: "Unknown error when updating contact request in database",
    });
  }
};
