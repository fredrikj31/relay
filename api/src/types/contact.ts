import z from "zod";

export const ContactRequestStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "DECLINED",
]);
export type ContactRequestStats = z.infer<typeof ContactRequestStatusSchema>;

export const ContactRequestSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  senderAccountId: z.uuid(),
  receiverAccountId: z.uuid(),
  status: ContactRequestStatusSchema,
});
export type ContactRequest = z.infer<typeof ContactRequestSchema>;
