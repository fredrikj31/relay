import { CommonQueryMethods, sql } from "slonik";
import { Room, RoomSchema } from "../../../../types/room";
import { InternalServerError } from "../../../../errors/server";
import { logger } from "../../../../logger";

interface ListRoomsOptions {
  accountId: string;
}
export const listRooms = async (
  database: CommonQueryMethods,
  { accountId }: ListRoomsOptions,
): Promise<Room[]> => {
  try {
    const rooms = await database.any(sql.type(RoomSchema)`
      SELECT
        room.id,
        room.created_at,
        room.updated_at,
        room.deleted_at,
        room.type,
        room.name,
        room.owner_account_id
      FROM
        room
      JOIN
        room_member ON room_member.room_id = room.id
      WHERE
        room_member.account_id = ${accountId}
    `);
    return [...rooms];
  } catch (error) {
    logger.error({ error }, "Error while listing rooms in database.");
    throw new InternalServerError({
      code: "unknown-error-listing-new-room",
      message: "Unknown error when trying to list rooms in database",
    });
  }
};
