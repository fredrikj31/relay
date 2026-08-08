import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import {
  ContactRequest,
  ContactRequestSchema,
} from "../../../../types/contact";
import { User, UserSchema } from "../../../../types/user";

interface ListSentContactRequestsOptions {
  accountId: string;
}
export const listSentContactRequests = async (
  database: CommonQueryMethods,
  { accountId }: ListSentContactRequestsOptions,
): Promise<
  Readonly<
    (Omit<ContactRequest, "senderAccountId"> & {
      user: User;
    })[]
  >
> => {
  try {
    return await database.any(sql.type(
      ContactRequestSchema.omit({ senderAccountId: true }).extend({
        user: UserSchema,
      }),
    )`
      SELECT
        contact_request.id as id,
        contact_request.receiver_account_id as receiver_account_id,
        contact_request.status as status,
        contact_request.created_at as created_at,
        contact_request.updated_at as updated_at,
        contact_request.deleted_at as deleted_at,
        json_build_object(
          'id', "user".id,
          'username', "user".username,
          'name', "user".name
        ) as user
      FROM
        contact_request
        JOIN "user" ON contact_request.receiver_account_id = "user".id
      WHERE
        contact_request.sender_account_id = ${accountId}
      AND
        contact_request.status = 'PENDING'
      AND
        contact_request.deleted_at IS NULL;
    `);
  } catch (error) {
    logger.error(
      error,
      "Error while listing sent contact requests in database.",
    );
    throw new InternalServerError({
      code: "unknown-error-listing-sent-contact-requests",
      message:
        "Unknown error when trying to list sent contact requests from database",
    });
  }
};
