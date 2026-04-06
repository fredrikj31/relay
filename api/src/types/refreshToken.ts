import z from "zod";

export const RefreshTokenSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  expiresAt: z.iso.datetime(),
});
export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
