import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import z from "zod";
import { ContactRequestSchema, ContactSchema } from "../../types/contact";
import { createContactRequestHandler } from "./handlers/createContactRequest";
import { deleteContactRequestHandler } from "./handlers/deleteContactRequest";
import { acceptOrDeclineContactRequest } from "./handlers/acceptOrDeclineContactRequest";
import { listAccountContactsHandler } from "./handlers/listAccountContacts";
import { AccountSchema } from "../../types/account";
import { listSendContactRequestsHandler } from "./handlers/listSentContactRequests";

export const contactRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.get(
    "/",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "List account's contacts",
        description:
          "Lists account's contacts and their account profile with details about them.",
        tags: ["contacts"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": ContactSchema.omit({ accountId: true, contactId: true })
            .extend({
              account: AccountSchema.pick({
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              }),
            })
            .array()
            .describe(
              "Returns a list of the account's contacts, and their account.",
            ),
        },
      },
    },
    async (req, res) => {
      const accountId = req.account?.id;
      const contacts = await listAccountContactsHandler({
        database,
        accountId,
      });
      return res.send(contacts);
    },
  );

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

  app.get(
    "/requests/sent",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "List account's sent contact requests",
        description: "Lists account's sent contact requests to other accounts.",
        tags: ["contacts"],
        security: [
          {
            jwt: [""],
          },
        ],
        response: {
          "200": ContactRequestSchema.omit({ senderAccountId: true })
            .extend({
              account: AccountSchema.pick({
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              }),
            })
            .array(),
        },
      },
    },
    async (req, res) => {
      const accountId = req.account?.id;
      const sentContactRequests = await listSendContactRequestsHandler({
        database,
        accountId,
      });

      return res.status(200).send(sentContactRequests);
    },
  );
};
