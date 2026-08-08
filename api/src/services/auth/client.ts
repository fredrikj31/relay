import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { databaseClient } from "../drizzle-database/client";
import * as schema from "../drizzle-database/schemas/auth";
import { username } from "better-auth/plugins";
import { config } from "../../config";

export const authClient = betterAuth({
  baseURL: config.auth.baseUrl,
  secret: config.auth.secret,
  trustedOrigins: [config.website.baseUrl],
  database: drizzleAdapter(databaseClient, {
    provider: "pg",
    schema: {
      ...schema, // spread all exported tables
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  plugins: [username()],
});
