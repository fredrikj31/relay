import { pgTable, timestamp, text, index, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { createUpdateSchema } from "drizzle-orm/zod";

export const contact = pgTable(
  "contact",
  {
    id: uuid("id").notNull().primaryKey(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    contactId: text("contact_id")
      .notNull()
      .references(() => user.id),
  },
  (table) => [index("contact_user_id_index").on(table.userId)],
);

export const ContactSchema = createUpdateSchema(contact);
export type Contact = typeof contact.$inferSelect;
