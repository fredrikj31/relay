import { Database } from "../../client";
import { ContactRequest, contactRequest } from "../../schemas/contact";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { and, eq, isNull } from "drizzle-orm";

export const updateContactRequest = async ({
  databaseClient,
  id,
  receiverUserId,
  status,
}: { databaseClient: Database } & Pick<
  ContactRequest,
  "id" | "receiverUserId" | "status"
>): Promise<ContactRequest> => {
  const result = await databaseClient
    .update(contactRequest)
    .set({ status, updatedAt: new Date() })
    .where(
      and(
        eq(contactRequest.id, id),
        eq(contactRequest.receiverUserId, receiverUserId),
        isNull(contactRequest.deletedAt),
      ),
    )
    .returning()
    .catch((error) => {
      logger.error(error, "Error while updating contact request.");
      throw new InternalServerError({
        code: "unknown-error-updating-contact-request",
        message: "Unknown error when trying to update contact request",
      });
    });

  const row = result[0];
  if (!row) {
    throw new InternalServerError({
      code: "error-updating-contact-request-no-rows",
      message:
        "Error updating contact request. Database query did not return any rows.",
    });
  }

  return row;
};
