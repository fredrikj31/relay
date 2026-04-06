import {
  CommonQueryMethods,
  ForeignKeyIntegrityConstraintViolationError,
  sql,
} from "slonik";
import {
  RefreshToken,
  RefreshTokenSchema,
} from "../../../../types/refreshToken";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { BadRequestError } from "../../../../errors/client";

interface CreateRefreshTokenOptions {
  tokenId: string;
  accountId: string;
  expiresAt: string;
}

export const createRefreshToken = async (
  database: CommonQueryMethods,
  { tokenId, accountId, expiresAt }: CreateRefreshTokenOptions,
): Promise<RefreshToken> => {
  try {
    return await database.one(sql.type(RefreshTokenSchema)`
      INSERT INTO
        refresh_token (
          id,
          account_id,
          expires_at
        )
      VALUES
        (
          ${tokenId},
          ${accountId},
          ${expiresAt}
        )
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
      logger.error(
        { error },
        "Account id doesn't match any account ids in accounts table",
      );
      throw new BadRequestError({
        code: "account-id-not-found",
        message: "The provided account id doesn't exists in accounts table",
      });
    }

    logger.error({ error }, "Error while creating refresh token in database.");
    throw new InternalServerError({
      code: "unknown-error-creating-new-refresh-token",
      message: "Unknown error when trying to create refresh token in database",
    });
  }
};
