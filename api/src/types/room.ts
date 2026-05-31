import z from "zod";

export const RoomTypeSchema = z.enum(["DIRECT", "GROUP"]);
export type RoomType = z.infer<typeof RoomTypeSchema>;

export const RoomSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  type: RoomTypeSchema,
  name: z.string().nullable(),
  ownerAccountId: z.uuid(),
});
export type Room = z.infer<typeof RoomSchema>;

export const RoomMemberSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  roomId: z.uuid(),
  accountId: z.uuid(),
});
export type RoomMember = z.infer<typeof RoomMemberSchema>;
