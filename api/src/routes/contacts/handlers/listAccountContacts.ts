import { CommonQueryMethods } from "slonik";
import { Contact } from "../../../types/contact";
import { listContacts } from "../../../services/database/queries/contact/listContacts";
import { UnauthorizedError } from "../../../errors/client";
import { User } from "../../../types/user";

interface ListAccountContactsHandlerOptions {
  database: CommonQueryMethods;
  userId: string | undefined;
}
export const listAccountContactsHandler = async ({
  database,
  userId,
}: ListAccountContactsHandlerOptions): Promise<
  (Omit<Contact, "accountId" | "contactId"> & {
    user: User;
  })[]
> => {
  if (!userId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const contacts = await listContacts(database, {
    accountId: userId,
  });

  return [...contacts];
};
