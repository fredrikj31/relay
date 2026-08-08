import { CommonQueryMethods } from "slonik";
import { Room, RoomType } from "../../../types/room";
import { UnauthorizedError } from "../../../errors/client";
import { createRoom } from "../../../services/database/queries/room/createRoom";

interface CreateRoomHandlerOptions {
  database: CommonQueryMethods;
  userId: string | undefined;
  membersAccountId: string[];
  roomName: string | null;
}
export const createRoomHandler = async ({
  database,
  userId,
  membersAccountId,
  roomName,
}: CreateRoomHandlerOptions): Promise<Room> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  // TODO: Add more validation to check if room doesn't already exists with members
  // Check if account has all members in contacts

  const roomType: RoomType = membersAccountId.length === 1 ? "DIRECT" : "GROUP";

  const room = await createRoom(database, {
    accountId: userId,
    membersAccountId,
    roomName,
    roomType,
  });

  return room;
};
