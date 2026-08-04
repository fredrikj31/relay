import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { databaseClient } from "../drizzle-database/client";

export const authClient = betterAuth({
  database: drizzleAdapter(databaseClient, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
