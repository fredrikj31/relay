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
