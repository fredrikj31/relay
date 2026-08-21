import { Database } from "../../client";
import { ContactRequest, contactRequest } from "../../schemas/contact";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { and, eq, isNull } from "drizzle-orm";
import { User, user } from "../../schemas/auth";

export const listSentContactRequests = async (
  database: Database,
  { senderUserId }: Pick<ContactRequest, "senderUserId">,
): Promise<{ contactRequest: ContactRequest; user: User }[]> => {
  const rows = await database
    .select()
    .from(contactRequest)
    .innerJoin(user, eq(contactRequest.receiverUserId, user.id))
    .where(
      and(
        eq(contactRequest.senderUserId, senderUserId),
        eq(contactRequest.status, "PENDING"),
        isNull(contactRequest.deletedAt),
      ),
    )
    .catch((error) => {
      logger.error(error, "Error while listing sent contact requests.");
      throw new InternalServerError({
        code: "unknown-error-listing-sent-contact-requests",
        message: "Unknown error when trying to listing sent contact requests",
      });
    });

  const mappedRows = rows.map((item) => ({
    contactRequest: item.contact_request,
    user: item.user,
  }));

  return mappedRows;
};
