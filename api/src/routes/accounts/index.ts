import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import { AccountSchema } from "../../types/account";
import { getCurrentAccountHandler } from "./handlers/getCurrentAccount";

export const accountRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.get(
    "/me",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Gets account details for current user",
        description: "Gets account details for the currently logged in user.",
        tags: ["accounts"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": AccountSchema.omit({
            password: true,
            passwordSalt: true,
          }).describe("Currently logged in user's account."),
        },
      },
    },
    async (req, res) => {
      const accountId = req.account?.id;
      const account = await getCurrentAccountHandler({ database, accountId });
      return res.send(account);
    },
  );
};
