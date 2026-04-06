import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import { Account, AccountSchema } from "../../../../types/account";

interface GetAccountByIdOptions {
  id: string;
}

export const getAccountById = async (
  database: CommonQueryMethods,
  { id }: GetAccountByIdOptions,
): Promise<Account> => {
  try {
    return await database.one(sql.type(AccountSchema)`
      SELECT
        *
      FROM
        account
      WHERE
        id = ${id};
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "account-not-found",
        message: "Account with provided id, was not found in database",
      });
    }

    logger.error({ error }, "Error while getting account in database.");
    throw new InternalServerError({
      code: "unknown-error-getting-account-by-id",
      message: "Unknown error when trying to get account by id from database",
    });
  }
};
