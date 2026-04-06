import { CommonQueryMethods } from "slonik";
import { signJwt } from "../../../helpers/signJwt";
import { randomUUID } from "crypto";
import { config } from "../../../config";
import { loginUser } from "../../../services/database/queries/user/loginUser";
import { createRefreshToken } from "../../../services/database/queries/refreshToken/createRefreshToken";

interface LoginHandlerOptions {
  database: CommonQueryMethods;
  credentials: {
    email: string;
    password: string;
  };
}

interface LoginHandlerOutput {
  accessToken: {
    token: string;
    expiresAt: string;
  };
  refreshToken: {
    token: string;
    expiresAt: string;
  };
}

export const loginHandler = async ({
  database,
  credentials,
}: LoginHandlerOptions): Promise<LoginHandlerOutput> => {
  const account = await loginUser(database, {
    email: credentials.email,
    password: credentials.password,
  });

  const accessTokenExpiresAt = new Date(
    new Date().getTime() + config.jwt.accessTokenTTLSeconds * 1000,
  ).toISOString();
  const accessToken = signJwt({
    payload: {
      accountId: account.id,
      email: account.email,
    },
    expiresInSeconds: config.jwt.accessTokenTTLSeconds,
  });

  const refreshTokenExpiresAt = new Date(
    new Date().getTime() + config.jwt.refreshTokenTTLSeconds * 1000,
  ).toISOString();
  const refreshTokenId = randomUUID();
  const refreshToken = signJwt({
    payload: {},
    expiresInSeconds: config.jwt.refreshTokenTTLSeconds,
    tokenId: refreshTokenId,
  });

  await createRefreshToken(database, {
    tokenId: refreshTokenId,
    accountId: account.id,
    expiresAt: new Date(
      new Date().getTime() + config.jwt.refreshTokenTTLSeconds * 1000,
    ).toISOString(),
  });

  return {
    accessToken: {
      token: accessToken,
      expiresAt: accessTokenExpiresAt,
    },
    refreshToken: {
      token: refreshToken,
      expiresAt: refreshTokenExpiresAt,
    },
  };
};
