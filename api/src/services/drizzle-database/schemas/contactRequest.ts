import { pgTable, timestamp, text, index, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { createUpdateSchema } from "drizzle-orm/zod";

export const contactRequestStatusEnum = pgEnum("contact_request_status", [
  "PENDING",
  "ACCEPTED",
  "DECLINED",
]);

export const contactRequest = pgTable(
  "contact_request",
  {
    id: text("id").notNull().primaryKey(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
    senderUserId: text("sender_user_id")
      .notNull()
      .references(() => user.id),
    receiverUserId: text("receiver_user_id")
      .notNull()
      .references(() => user.id),
    status: contactRequestStatusEnum("status").notNull(),
  },
  (table) => [
    index("contact_request_sender_user_id_index").on(table.senderUserId),
    index("contact_request_receiver_user_id_index").on(table.receiverUserId),
  ],
);

export const ContactRequestSchema = createUpdateSchema(contactRequest);
export type ContactRequest = typeof contactRequest.$inferSelect;
