import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { Contact, ContactSchema } from "../../../../types/contact";
import { Account, AccountSchema } from "../../../../types/account";

interface ListContactsOptions {
  accountId: string;
}
export const listContacts = async (
  database: CommonQueryMethods,
  { accountId }: ListContactsOptions,
): Promise<
  Readonly<
    (Omit<Contact, "accountId" | "contactId"> & {
      account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
    })[]
  >
> => {
  try {
    return await database.any(sql.type(
      ContactSchema.omit({ accountId: true, contactId: true }).extend({
        account: AccountSchema.pick({
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        }),
      }),
    )`
      SELECT
        contact.id as id,
        contact.contact_id as contact_id,
        contact.created_at as created_at,
        contact.updated_at as updated_at,
        contact.deleted_at as deleted_at,
        json_build_object(
          'id', account.id,
          'username', account.username,
          'firstName', account.first_name,
          'lastName', account.last_name
        ) as account
      FROM
        contact
        JOIN account ON contact.contact_id = account.id
      WHERE
        contact.account_id = ${accountId};
    `);
  } catch (error) {
    logger.error(error, "Error while listing account contacts in database.");
    throw new InternalServerError({
      code: "unknown-error-listing-contacts",
      message:
        "Unknown error when trying to list account contacts from database",
    });
  }
};
