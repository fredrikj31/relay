import { ContactRequest } from "../../../services/drizzle-database/schemas/contact";
import { User } from "../../../services/drizzle-database/schemas/auth";
import { listSentContactRequests } from "../../../services/drizzle-database/queries/contact/listSentContactRequests";
import { UnauthorizedError } from "../../../errors/client";

interface ListSentContactRequestsHandlerOptions {
  userId: string | undefined;
}
export const listSentContactRequestsHandler = async ({
  userId,
}: ListSentContactRequestsHandlerOptions): Promise<
  { contactRequest: ContactRequest; user: User }[]
> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const sentContactRequests = await listSentContactRequests({
    senderUserId: userId,
  });

  return sentContactRequests;
};
