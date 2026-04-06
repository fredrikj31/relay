import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { AccountSchema } from "../../../../types/account";

interface DoesUsernameExistOptions {
  username: string;
}

export const doesUsernameExist = async (
  database: CommonQueryMethods,
  { username }: DoesUsernameExistOptions,
): Promise<boolean> => {
  const account = await database
    .any(
      sql.type(AccountSchema)`
      SELECT
        *
      FROM
        account
      WHERE
        username = ${username};
    `,
    )
    .catch((error) => {
      logger.error({ error }, "Error while checking if username exists");
      throw new InternalServerError({
        code: "failed-checking-username-exists",
        message: "Unknown error occurred when checking if username exists",
      });
    });

  if (account.length === 0) {
    return false;
  }
  return true;
};
