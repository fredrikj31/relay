import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import {
  ContactRequest,
  ContactRequestSchema,
} from "../../../../types/contact";
import { Account, AccountSchema } from "../../../../types/account";

interface ListReceivedContactRequestsOptions {
  accountId: string;
}
export const listReceivedContactRequests = async (
  database: CommonQueryMethods,
  { accountId }: ListReceivedContactRequestsOptions,
): Promise<
  Readonly<
    (Omit<ContactRequest, "receiverAccountId"> & {
      account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
    })[]
  >
> => {
  try {
    return await database.any(sql.type(
      ContactRequestSchema.omit({ receiverAccountId: true }).extend({
        account: AccountSchema.pick({
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        }),
      }),
    )`
      SELECT
        contact_request.id as id,
        contact_request.sender_account_id as sender_account_id,
        contact_request.status as status,
        contact_request.created_at as created_at,
        contact_request.updated_at as updated_at,
        contact_request.deleted_at as deleted_at,
        json_build_object(
          'id', account.id,
          'username', account.username,
          'firstName', account.first_name,
          'lastName', account.last_name
        ) as account
      FROM
        contact_request
        JOIN account ON contact_request.sender_account_id = account.id
      WHERE
        contact_request.receiver_account_id = ${accountId}
      AND
        contact_request.status = 'PENDING';
    `);
  } catch (error) {
    logger.error(
      error,
      "Error while listing received contact requests in database.",
    );
    throw new InternalServerError({
      code: "unknown-error-listing-sent-contact-requests",
      message:
        "Unknown error when trying to list received contact requests from database",
    });
  }
};
