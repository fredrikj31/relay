import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import { Account, AccountSchema } from "../../../../types/account";

interface GetAccountByUsernameOptions {
  username: string;
}
export const getAccountByUsername = async (
  database: CommonQueryMethods,
  { username }: GetAccountByUsernameOptions,
): Promise<Account> => {
  try {
    return await database.one(sql.type(AccountSchema)`
      SELECT
        *
      FROM
        account
      WHERE
        username = ${username};
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "account-not-found",
        message: "Account with provided username, was not found in database",
      });
    }

    logger.error(
      { error },
      "Error while getting account by username in database.",
    );
    throw new InternalServerError({
      code: "unknown-error-getting-account-by-username",
      message:
        "Unknown error when trying to get account by username from database",
    });
  }
};
