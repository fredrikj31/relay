import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import {
  Room,
  RoomMemberSchema,
  RoomSchema,
  RoomType,
} from "../../../../types/room";
import { randomUUID } from "node:crypto";

interface CreateRoomOptions {
  accountId: string;
  membersAccountId: string[];
  roomType: RoomType;
  roomName: string | null;
}
export const createRoom = async (
  database: CommonQueryMethods,
  { accountId, membersAccountId, roomType, roomName }: CreateRoomOptions,
): Promise<Room> => {
  try {
    return await database.transaction(async (transaction) => {
      const room = await transaction.one(sql.type(RoomSchema)`
        INSERT INTO
          room (
            id,
            created_at,
            updated_at,
            deleted_at,
            type,
            name,
            owner_account_id
          )
        VALUES
          (
            ${randomUUID()},
            ${new Date().toISOString()},
            NULL,
            NULL,
            ${roomType},
            ${roomName},
            ${accountId}
          )
        RETURNING *;
      `);

      await transaction.many(sql.type(RoomMemberSchema)`
        INSERT INTO
          room_member (
            id,
            created_at,
            updated_at,
            deleted_at,
            room_id,
            account_id
          )
        SELECT *
        FROM ${sql.unnest(
          [
            [
              randomUUID(),
              new Date().toISOString(),
              null,
              null,
              room.id,
              accountId,
            ],
            ...membersAccountId.map((memberAccountId) => [
              randomUUID(),
              new Date().toISOString(),
              null,
              null,
              room.id,
              memberAccountId,
            ]),
          ],
          ["uuid", "timestamptz", "timestamptz", "timestamptz", "uuid", "uuid"],
        )}
        RETURNING *;
      `);

      return room;
    });
  } catch (error) {
    logger.error({ error }, "Error while creating room in database.");
    throw new InternalServerError({
      code: "unknown-error-creating-new-room",
      message: "Unknown error when trying to create room in database",
    });
  }
};
