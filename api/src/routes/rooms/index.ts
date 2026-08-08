import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validateSession } from "../../hooks/validateSession";
import { RoomSchema } from "../../types/room";
import z from "zod";
import { createRoomHandler } from "./handlers/createRoom";
import { listRoomsHandler } from "./handlers/listRooms";

export const roomRoutes: FastifyPluginAsync = async (instance) => {
  const app = instance.withTypeProvider<ZodTypeProvider>();
  const database = instance.database;

  app.post(
    "/",
    {
      onRequest: validateSession(),
      schema: {
        summary: "Create room",
        description:
          "Creates a new room and adds the sender and list of members to the room.",
        tags: ["rooms"],
        body: z.object({
          roomName: z.string().nullable(),
          membersAccountId: z
            .string()
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
      const userId = req.userId;
      const { roomName, membersAccountId } = req.body;
      const room = await createRoomHandler({
        database,
        userId,
        roomName,
        membersAccountId,
      });
      return res.send(room);
    },
  );

  app.get(
    "/",
    {
      onRequest: validateSession(),
      schema: {
        summary: "Lists rooms",
        description: "Lists rooms that the user is member of",
        tags: ["rooms"],
        response: {
          "200": RoomSchema.array().describe(
            "Returns rooms the user is member of.",
          ),
        },
      },
    },
    async (req, res) => {
      const userId = req.userId;
      const rooms = await listRoomsHandler({
        database,
        userId,
      });
      return res.send(rooms);
    },
  );
};
