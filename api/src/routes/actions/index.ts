import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ProfileSchema } from "../../types/profile";
import { signupHandler } from "./handlers/signup";
import z from "zod";
import { AccountSchema } from "../../types/account";
import { loginHandler } from "./handlers/login";

export const actionRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.post(
    "/signup",
    {
      schema: {
        summary: "Signs up a user",
        description: "Signs up the user and creates them in the database",
        tags: ["actions"],
        body: z.object({
          ...AccountSchema.pick({ email: true, password: true }).shape,
          ...ProfileSchema.omit({
            userId: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          }).shape,
        }),
        response: {
          "200": z.object({
            ...AccountSchema.pick({ userId: true, email: true }).shape,
            ...ProfileSchema.omit({
              userId: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            }).shape,
          }),
        },
      },
    },
    async (req, res) => {
      const createdUser = await signupHandler({ database, user: req.body });
      return res.send(createdUser);
    },
  );

  app.post(
    "/login",
    {
      schema: {
        summary: "Login a user",
        description: "Logs in the user and returns access & refresh tokens",
        tags: ["actions"],
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
        response: {
          "204": z.void(),
        },
      },
    },
    async (req, res) => {
      const { accessToken, refreshToken } = await loginHandler({
        database,
        credentials: req.body,
      });

      // Sets access and refresh token in the cookies
      res.setCookie("access_token", accessToken.token, {
        expires: new Date(accessToken.expiresAt),
      });
      res.setCookie("refresh_token", refreshToken.token, {
        expires: new Date(refreshToken.expiresAt),
      });
      return res.status(204).send();
    },
  );
};
