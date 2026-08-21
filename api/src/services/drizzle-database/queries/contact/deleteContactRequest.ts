import { Database } from "../../client";
import { ContactRequest, contactRequest } from "../../schemas/contact";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { and, eq } from "drizzle-orm";

export const deleteContactRequest = async (
  database: Database,
  { id, senderUserId }: Pick<ContactRequest, "id" | "senderUserId">,
): Promise<ContactRequest> => {
  const result = await database
    .update(contactRequest)
    .set({ deletedAt: new Date() })
    .where(
      and(
        eq(contactRequest.id, id),
        eq(contactRequest.senderUserId, senderUserId),
        eq(contactRequest.status, "PENDING"),
      ),
    )
    .returning()
    .catch((error) => {
      logger.error(error, "Error while deleting contact request.");
      throw new InternalServerError({
        code: "unknown-error-deleting-contact-request",
        message: "Unknown error when trying to delete contact request",
      });
    });

  const row = result[0];
  if (!row) {
    throw new InternalServerError({
      code: "error-deleting-contact-request-no-rows",
      message:
        "Error deleting contact request. Database query did not return any rows.",
    });
  }

  return row;
};
