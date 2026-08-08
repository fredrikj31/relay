import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { Contact, ContactSchema } from "../../../../types/contact";
import { User, UserSchema } from "../../../../types/user";

interface ListContactsOptions {
  accountId: string;
}
export const listContacts = async (
  database: CommonQueryMethods,
  { accountId }: ListContactsOptions,
): Promise<
  Readonly<
    (Omit<Contact, "accountId" | "contactId"> & {
      user: User;
    })[]
  >
> => {
  try {
    return await database.any(sql.type(
      ContactSchema.omit({ accountId: true, contactId: true }).extend({
        user: UserSchema,
      }),
    )`
      SELECT
        contact.id as id,
        contact.contact_id as contact_id,
        contact.created_at as created_at,
        contact.updated_at as updated_at,
        contact.deleted_at as deleted_at,
        json_build_object(
          'id', "user".id,
          'username', "user".username,
          'name', "user".name
        ) as user
      FROM
        contact
        JOIN "user" ON contact.contact_id = "user".id
      WHERE
        contact.account_id = ${accountId}
      AND
        contact.deleted_at IS NULL;
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
