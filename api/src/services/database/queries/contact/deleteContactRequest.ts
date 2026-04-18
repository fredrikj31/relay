import {
  CommonQueryMethods,
  NotFoundError as SlonikNotFoundError,
  sql,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import {
  ContactRequest,
  ContactRequestSchema,
} from "../../../../types/contact";

interface DeleteContactRequestOptions {
  requestId: string;
  accountId: string;
}
export const deleteContactRequest = async (
  database: CommonQueryMethods,
  { requestId, accountId }: DeleteContactRequestOptions,
): Promise<ContactRequest> => {
  try {
    return await database.one(sql.type(ContactRequestSchema)`
      UPDATE
        contact_request
      SET
        deleted_at = ${new Date().toISOString()}
      WHERE
        id = ${requestId}
      AND
        sender_account_id = ${accountId}
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "delete-contact-request-by-id-not-found",
        message: "Contact request with specified id was not found",
      });
    }

    logger.error(error, "Error while deleting contact request by id.");
    throw new InternalServerError({
      code: "unknown-error-deleting-contact-request-by-id",
      message: "Unknown error when trying to delete contact request by id",
    });
  }
};
