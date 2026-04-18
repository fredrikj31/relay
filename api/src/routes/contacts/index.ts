import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import z from "zod";
import { ContactRequestSchema } from "../../types/contact";
import { createContactRequestHandler } from "./handlers/createContactRequest";
import { deleteContactRequestHandler } from "./handlers/deleteContactRequest";
import { acceptOrDeclineContactRequest } from "./handlers/acceptOrDeclineContactRequest";

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
      const { contactId } = req.body;
      const contactRequest = await createContactRequestHandler({
        database,
        accountId,
        contactId,
      });

      return res.status(200).send(contactRequest);
    },
  );

  app.delete(
    "/requests/:requestId",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Deletes a contact request",
        description: "Deletes a contact requests to another user.",
        tags: ["contacts"],
        security: [
          {
            jwt: [""],
          },
        ],
        params: z.object({
          requestId: z.uuid(),
        }),
        response: {
          "200": ContactRequestSchema,
        },
      },
    },
    async (req, res) => {
      const accountId = req.account?.id;
      const { requestId } = req.params;
      const contactRequest = await deleteContactRequestHandler({
        database,
        accountId,
        requestId,
      });

      return res.status(200).send(contactRequest);
    },
  );

  app.put(
    "/requests/:requestId",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Accepts or Declines a contact request",
        description: "Accepts or Declines a contact requests to another user.",
        tags: ["contacts"],
        security: [
          {
            jwt: [""],
          },
        ],
        params: z.object({
          requestId: z.uuid(),
        }),
        body: z.object({
          status: z.enum(["accepted", "declined"]),
        }),
        response: {
          "200": ContactRequestSchema,
        },
      },
    },
    async (req, res) => {
      const accountId = req.account?.id;
      const { requestId } = req.params;
      const { status } = req.body;
      const contactRequest = await acceptOrDeclineContactRequest({
        database,
        accountId,
        requestId,
        status,
      });

      return res.status(200).send(contactRequest);
    },
  );
};
