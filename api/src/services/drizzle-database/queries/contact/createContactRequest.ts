import { randomUUID } from "crypto";
import { databaseClient } from "../../client";
import { ContactRequest, contactRequest } from "../../schemas/contact";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

export const createContactRequest = async ({
  senderUserId,
  receiverUserId,
}: Pick<
  ContactRequest,
  "senderUserId" | "receiverUserId"
>): Promise<ContactRequest> => {
  const result = await databaseClient
    .insert(contactRequest)
    .values({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      senderUserId,
      receiverUserId,
      status: "PENDING",
    })
    .returning()
    .catch((error) => {
      logger.error(error, "Error while creating contact request.");
      throw new InternalServerError({
        code: "unknown-error-creating-contact-request",
        message: "Unknown error when trying to create contact request",
      });
    });

  const row = result[0];
  if (!row) {
    throw new InternalServerError({
      code: "error-creating-contact-request-no-rows",
      message:
        "Error creating contact request. Database query did not return any rows.",
    });
  }

  return row;
};
