import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ProfileSchema } from "../../types/profile";
import { signupHandler } from "./handlers/signup";
import z from "zod";
import { AccountSchema } from "../../types/account";

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
};
