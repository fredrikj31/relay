import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import {
  RefreshToken,
  RefreshTokenSchema,
} from "../../../../types/refreshToken";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";

interface GetRefreshTokenByIdOptions {
  refreshTokenId: string;
}
export const getRefreshTokenById = async (
  database: CommonQueryMethods,
  { refreshTokenId }: GetRefreshTokenByIdOptions,
): Promise<RefreshToken> => {
  try {
    return await database.one(sql.type(RefreshTokenSchema)`
      SELECT
        *
      FROM
        refresh_token
      WHERE
        id = ${refreshTokenId};
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "refresh-token-not-found",
        message: "Refresh token was not found in database",
      });
    }

    logger.error({ error }, "Error while getting refresh token in database.");
    throw new InternalServerError({
      code: "unknown-error-getting-refresh-token",
      message: "Unknown error when trying to get refresh token from database",
    });
  }
};
