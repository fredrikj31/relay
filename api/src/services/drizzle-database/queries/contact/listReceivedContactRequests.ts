import { databaseClient } from "../../client";
import { ContactRequest, contactRequest } from "../../schemas/contact";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { eq } from "drizzle-orm";

export const listReceivedContactRequests = async ({
  receiverUserId,
}: Pick<ContactRequest, "receiverUserId">): Promise<ContactRequest[]> => {
  const rows = await databaseClient
    .select()
    .from(contactRequest)
    .where(eq(contactRequest.receiverUserId, receiverUserId))
    .catch((error) => {
      logger.error(error, "Error while listing received contact requests.");
      throw new InternalServerError({
        code: "unknown-error-listing-received-contact-requests",
        message:
          "Unknown error when trying to listing received contact requests",
      });
    });

  return rows;
};
