import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../drizzle-database/schemas/auth";
import { username, openAPI } from "better-auth/plugins";
import { config } from "../../config";
import { Database } from "../drizzle-database/client";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

const createAuth = (database: Database) =>
  betterAuth({
    baseURL: config.auth.baseUrl,
    secret: config.auth.secret,
    trustedOrigins: [config.website.baseUrl],
    database: drizzleAdapter(database, {
      provider: "pg",
      schema: {
        ...schema,
      },
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: false,
    },
    plugins: [
      username(),
      openAPI({
        disableDefaultReference: true,
      }),
    ],
  });

export type Auth = ReturnType<typeof createAuth>;

const auth = async (fastify: FastifyInstance) => {
  const authClient = createAuth(fastify.drizzleDatabase);
  fastify.decorate("auth", authClient);
};

export const authPlugin = fastifyPlugin(auth, {
  name: "auth",
  dependencies: ["drizzle-database"],
});

declare module "fastify" {
  export interface FastifyInstance {
    auth: Auth;
  }
}
