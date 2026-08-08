import { CommonQueryMethods } from "slonik";
import { Room } from "../../../types/room";
import { listRooms } from "../../../services/database/queries/room/listRooms";
import { UnauthorizedError } from "../../../errors/client";

interface ListRoomsHandlerOptions {
  database: CommonQueryMethods;
  userId: string | undefined;
}
export const listRoomsHandler = async ({
  database,
  userId,
}: ListRoomsHandlerOptions): Promise<Room[]> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const rooms = await listRooms(database, {
    accountId: userId,
  });

  return rooms;
};
