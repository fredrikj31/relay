import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import z from "zod";
import { ContactRequestSchema } from "../../types/contact";
import { BadRequestError, UnauthorizedError } from "../../errors/client";
import { createContactRequest } from "../../services/database/queries/contact/createContactRequest";

export const contactRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.post(
    "/requests",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Creates a new contact request",
        description: "Creates a new contact requests to another user.",
        tags: ["contacts"],
        security: [
          {
            jwt: [""],
          },
        ],
        body: z.object({
          contactId: z.uuid(),
        }),
        response: {
          "200": ContactRequestSchema,
        },
      },
    },
    async (req, res) => {
      const accountId = req.account?.id;
      if (!accountId) {
        throw new UnauthorizedError({
          code: "account-id-not-found-in-request",
          message: "A account id wasn't found in the request object",
        });
      }

      const { contactId } = req.body;

      if (accountId === contactId) {
        throw new BadRequestError({
          code: "contact-request-contact-id-matches-account-id",
          message: "Contact id matches the account id from the access token",
        });
      }

      const contactRequest = await createContactRequest(database, {
        accountId,
        contactId,
      });

      return res.status(200).send(contactRequest);
    },
  );
};
