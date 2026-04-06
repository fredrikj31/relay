import { CommonQueryMethods } from "slonik";
import { BadRequestError } from "../../../errors/client";
import { validateJwtToken } from "../../../helpers/validateJwtToken";
import { signJwt } from "../../../helpers/signJwt";
import { config } from "../../../config";
import { getRefreshTokenById } from "../../../services/database/queries/refreshToken/getRefreshTokenById";
import { getAccountById } from "../../../services/database/queries/user/getUserById";

interface TokenHandlerOptions {
  database: CommonQueryMethods;
  refreshToken: string;
}

interface TokenHandlerOutput {
  accessToken: string;
  expiresAt: string;
}

export const tokenHandler = async ({
  database,
  refreshToken,
}: TokenHandlerOptions): Promise<TokenHandlerOutput> => {
  // Validate refresh token
  const refreshTokenPayload = await validateJwtToken({ token: refreshToken });

  const refreshTokenId = refreshTokenPayload.jti;
  if (!refreshTokenId) {
    throw new BadRequestError({
      code: "refresh-token-id-not-found",
      message: "Couldn't find the refresh token id inside of token",
    });
  }

  // Lookup refresh token in database
  const refreshTokenItem = await getRefreshTokenById(database, {
    refreshTokenId,
  });

  if (refreshTokenItem.expiresAt < new Date().toISOString()) {
    throw new BadRequestError({
      code: "refresh-token-expired",
      message: "The provided refresh token has expired",
    });
  }

  // Get account details
  const account = await getAccountById(database, {
    id: refreshTokenItem.accountId,
  });

  const expiresAt = new Date(
    new Date().getTime() + config.jwt.accessTokenTTLSeconds * 1000,
  ).toISOString();

  // Sign new access token
  const accessToken = signJwt({
    payload: {
      userId: account.id,
    },
    expiresInSeconds: config.jwt.accessTokenTTLSeconds, // 24 hours
  });

  return { accessToken, expiresAt };
};
