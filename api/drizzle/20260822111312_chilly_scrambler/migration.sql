CREATE TABLE "contact" (
	"id" uuid PRIMARY KEY,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"user_id" text NOT NULL,
	"contact_id" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "contact_user_id_index" ON "contact" ("user_id");--> statement-breakpoint
ALTER TABLE "contact" ADD CONSTRAINT "contact_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "contact" ADD CONSTRAINT "contact_contact_id_user_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "user"("id");