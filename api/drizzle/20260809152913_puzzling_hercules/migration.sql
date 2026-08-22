CREATE TYPE "contact_request_status" AS ENUM('PENDING', 'ACCEPTED', 'DECLINED');--> statement-breakpoint
CREATE TABLE "contact_request" (
	"id" uuid PRIMARY KEY,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"sender_user_id" text NOT NULL,
	"receiver_user_id" text NOT NULL,
	"status" "contact_request_status" NOT NULL
);
--> statement-breakpoint
CREATE INDEX "contact_request_sender_user_id_index" ON "contact_request" ("sender_user_id");--> statement-breakpoint
CREATE INDEX "contact_request_receiver_user_id_index" ON "contact_request" ("receiver_user_id");--> statement-breakpoint
ALTER TABLE "contact_request" ADD CONSTRAINT "contact_request_sender_user_id_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "contact_request" ADD CONSTRAINT "contact_request_receiver_user_id_user_id_fkey" FOREIGN KEY ("receiver_user_id") REFERENCES "user"("id");