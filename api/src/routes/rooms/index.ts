import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateJwt } from "../../hooks/validateJwt";
import { RoomSchema } from "../../types/room";
import z from "zod";
import { createRoomHandler } from "./handlers/createRoom";

export const roomRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.post(
    "/",
    {
      onRequest: validateJwt(),
      schema: {
        summary: "Create room",
        description:
          "Creates a new room and adds the sender and list of members to the room.",
        tags: ["rooms"],
        security: [
          {
            jwt: [""],
          },
        ],
        body: z.object({
          roomName: z.string().nullable(),
          membersAccountId: z
            .uuid()
            .array()
            .describe(
              "A list of account ids that needs to be added to the room.",
            ),
        }),
        response: {
          "200": RoomSchema.describe("Returns a the newly created room"),
        },
      },
    },
    async (req, res) => {
      const accountId = req.account?.id;
      const { roomName, membersAccountId } = req.body;
      const room = await createRoomHandler({
        database,
        accountId,
        roomName,
        membersAccountId,
      });
      return res.send(room);
    },
  );
};
