import z from "zod";

export const AccountSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  passwordSalt: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable(),
  deletedAt: z.iso.datetime().nullable(),
});
export type Account = z.infer<typeof AccountSchema>;
