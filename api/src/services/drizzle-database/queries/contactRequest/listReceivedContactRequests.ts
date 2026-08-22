import { Database } from "../../client";
import { ContactRequest, contactRequest } from "../../schemas/contactRequest";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { and, eq, isNull } from "drizzle-orm";
import { User, user } from "../../schemas/auth";

export const listReceivedContactRequests = async (
  database: Database,
  { receiverUserId }: Pick<ContactRequest, "receiverUserId">,
): Promise<{ contactRequest: ContactRequest; user: User }[]> => {
  const rows = await database
    .select()
    .from(contactRequest)
    .innerJoin(user, eq(contactRequest.senderUserId, user.id))
    .where(
      and(
        eq(contactRequest.receiverUserId, receiverUserId),
        eq(contactRequest.status, "PENDING"),
        isNull(contactRequest.deletedAt),
      ),
    )
    .catch((error) => {
      logger.error(error, "Error while listing received contact requests.");
      throw new InternalServerError({
        code: "unknown-error-listing-received-contact-requests",
        message:
          "Unknown error when trying to listing received contact requests",
      });
    });

  const mappedRows = rows.map((item) => ({
    contactRequest: item.contact_request,
    user: item.user,
  }));

  return mappedRows;
};
