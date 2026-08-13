import { UnauthorizedError } from "../../../errors/client";
import { ContactRequest } from "../../../services/drizzle-database/schemas/contact";
import { listReceivedContactRequests } from "../../../services/drizzle-database/queries/contact/listReceivedContactRequests";
import { User } from "../../../services/drizzle-database/schemas/auth";

interface ListReceivedContactRequestsHandlerOptions {
  userId: string | undefined;
}
export const listReceivedContactRequestsHandler = async ({
  userId,
}: ListReceivedContactRequestsHandlerOptions): Promise<
  { contactRequest: ContactRequest; user: User }[]
> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const receivedContactRequests = await listReceivedContactRequests({
    receiverUserId: userId,
  });

  return receivedContactRequests;
};
