import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateSession } from "../../hooks/validateSession";
import z from "zod";
import { ContactSchema } from "../../types/contact";
import { UserSchema } from "../../types/user";
import { createContactRequestHandler } from "./handlers/createContactRequest";
import { deleteContactRequestHandler } from "./handlers/deleteContactRequest";
import { acceptOrDeclineContactRequest } from "./handlers/acceptOrDeclineContactRequest";
import { listAccountContactsHandler } from "./handlers/listAccountContacts";
import { listSentContactRequestsHandler } from "./handlers/listSentContactRequests";
import { listReceivedContactRequestsHandler } from "./handlers/listReceivedContactRequests";
import { UserSchema as drizzleUserSchema } from "../../services/drizzle-database/schemas/auth";
import { ContactRequestSchema as drizzleContactRequestSchema } from "../../services/drizzle-database/schemas/contact";

export const contactRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;
  const drizzleDatabase = instance.drizzleDatabase;

  app.get(
    "/",
    {
      onRequest: validateSession(),
      schema: {
        summary: "List account's contacts",
        description:
          "Lists account's contacts and their user profile with details about them.",
        tags: ["contacts"],
        response: {
          "200": ContactSchema.omit({ accountId: true, contactId: true })
            .extend({
              user: UserSchema,
            })
            .array()
            .describe(
              "Returns a list of the account's contacts, and their user.",
            ),
        },
      },
    },
    async (req, res) => {
      const userId = req.userId;
      const contacts = await listAccountContactsHandler({
        database,
        userId,
      });
      return res.send(contacts);
    },
  );

  app.post(
    "/requests",
    {
      onRequest: validateSession(),
      schema: {
        summary: "Creates a new contact request",
        description: "Creates a new contact requests to another user.",
        tags: ["contacts"],
        body: z.object({
          username: z.string(),
        }),
        response: {
          "200": drizzleContactRequestSchema,
        },
      },
    },
    async (req, res) => {
      const userId = req.userId;
      const { username } = req.body;
      const contactRequest = await createContactRequestHandler({
        database: drizzleDatabase,
        userId,
        username,
      });

      return res.status(200).send(contactRequest);
    },
  );

  app.delete(
    "/requests/:requestId",
    {
      onRequest: validateSession(),
      schema: {
        summary: "Deletes a contact request",
        description: "Deletes a contact requests to another user.",
        tags: ["contacts"],
        params: z.object({
          requestId: z.uuid(),
        }),
        response: {
          "200": drizzleContactRequestSchema,
        },
      },
    },
    async (req, res) => {
      const userId = req.userId;
      const { requestId } = req.params;
      const contactRequest = await deleteContactRequestHandler({
        database: drizzleDatabase,
        userId,
        requestId,
      });

      return res.status(200).send(contactRequest);
    },
  );

  app.put(
    "/requests/:requestId",
    {
      onRequest: validateSession(),
      schema: {
        summary: "Accepts or Declines a contact request",
        description: "Accepts or Declines a contact requests to another user.",
        tags: ["contacts"],
        params: z.object({
          requestId: z.uuid(),
        }),
        body: z.object({
          status: z.enum(["accepted", "declined"]),
        }),
        response: {
          "200": drizzleContactRequestSchema,
        },
      },
    },
    async (req, res) => {
      const userId = req.userId;
      const { requestId } = req.params;
      const { status } = req.body;
      const contactRequest = await acceptOrDeclineContactRequest({
        database: drizzleDatabase,
        userId,
        requestId,
        status,
      });

      return res.status(200).send(contactRequest);
    },
  );

  app.get(
    "/requests/sent",
    {
      onRequest: validateSession(),
      schema: {
        summary: "List account's sent contact requests",
        description: "Lists account's sent contact requests to other accounts.",
        tags: ["contacts"],
        response: {
          "200": z
            .object({
              contactRequest: drizzleContactRequestSchema,
              user: drizzleUserSchema,
            })
            .array(),
        },
      },
    },
    async (req, res) => {
      const userId = req.userId;
      const sentContactRequests = await listSentContactRequestsHandler({
        database: drizzleDatabase,
        userId,
      });

      return res.status(200).send(sentContactRequests);
    },
  );

  app.get(
    "/requests/received",
    {
      onRequest: validateSession(),
      schema: {
        summary: "List account's received contact requests",
        description:
          "Lists account's received contact requests to other accounts.",
        tags: ["contacts"],
        response: {
          "200": z
            .object({
              contactRequest: drizzleContactRequestSchema,
              user: drizzleUserSchema,
            })
            .array(),
        },
      },
    },
    async (req, res) => {
      const userId = req.userId;
      const receivedContactRequests = await listReceivedContactRequestsHandler({
        database: drizzleDatabase,
        userId,
      });

      return res.status(200).send(receivedContactRequests);
    },
  );
};
