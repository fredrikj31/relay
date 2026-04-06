import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { Account, AccountSchema } from "../../../../types/account";

interface CreateAccountOptions {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  passwordSalt: string;
}

export const createAccount = async (
  database: CommonQueryMethods,
  {
    id,
    email,
    username,
    firstName,
    lastName,
    hashedPassword,
    passwordSalt,
  }: CreateAccountOptions,
): Promise<Account> => {
  return await database
    .one(
      sql.type(AccountSchema)`
      INSERT INTO
        account (
          id,
          email,
          username,
          first_name,
          last_name,
          password,
          password_salt,
          created_at,
          updated_at,
          deleted_at
        )
      VALUES
        (
          ${id},
          ${email},
          ${username},
          ${firstName},
          ${lastName},
          ${hashedPassword},
          ${passwordSalt},
          ${new Date().toISOString()},
          NULL,
          NULL
        )
      RETURNING *;
    `,
    )
    .catch((error) => {
      logger.error({ error }, "Error while creating account");
      throw new InternalServerError({
        code: "failed-creating-account",
        message: "Unknown error occurred when creating account",
      });
    });
};
