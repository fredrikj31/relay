import z from "zod";

export const ContactSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  userId: z.string(),
  contactId: z.string(),
});
export type Contact = z.infer<typeof ContactSchema>;
