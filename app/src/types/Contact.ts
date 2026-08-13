import z from "zod";

export const ContactRequestStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "DECLINED",
]);
export type ContactRequestStatus = z.infer<typeof ContactRequestStatusSchema>;

export const ContactRequestSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  deletedAt: z.coerce.date().nullable(),
  senderUserId: z.string(),
  receiverUserId: z.string(),
  status: ContactRequestStatusSchema,
});
export type ContactRequest = z.infer<typeof ContactRequestSchema>;

export const ContactSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  accountId: z.string(),
  contactId: z.string(),
});
export type Contact = z.infer<typeof ContactSchema>;
