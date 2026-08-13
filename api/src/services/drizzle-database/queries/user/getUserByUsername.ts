import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import { user, User } from "../../schemas/auth";
import { databaseClient } from "../../client";
import { eq } from "drizzle-orm";

interface GetUserByUsernameOptions {
  username: string;
}
export const getUserByUsername = async ({
  username,
}: GetUserByUsernameOptions): Promise<User> => {
  try {
    const result = await databaseClient
      .select()
      .from(user)
      .where(eq(user.username, username.toLowerCase()));

    const row = result[0];
    if (!row) {
      throw new NotFoundError({
        code: "user-not-found",
        message: "User with provided username, was not found in database",
      });
    }

    return row;
  } catch (error) {
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
