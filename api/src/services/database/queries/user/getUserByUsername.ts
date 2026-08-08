import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import { User, UserSchema } from "../../../../types/user";

interface GetUserByUsernameOptions {
  username: string;
}
export const getUserByUsername = async (
  database: CommonQueryMethods,
  { username }: GetUserByUsernameOptions,
): Promise<User> => {
  try {
    return await database.one(sql.type(UserSchema)`
      SELECT
        id,
        username,
        name
      FROM
        "user"
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
