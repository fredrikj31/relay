import { CommonQueryMethods } from "slonik";
import { Contact } from "../../../types/contact";
import { listContacts } from "../../../services/database/queries/contact/listContacts";
import { UnauthorizedError } from "../../../errors/client";
import { Account } from "../../../types/account";

interface ListAccountContactsHandlerOptions {
  database: CommonQueryMethods;
  accountId: string | undefined;
}
export const listAccountContactsHandler = async ({
  database,
  accountId,
}: ListAccountContactsHandlerOptions): Promise<
  (Omit<Contact, "accountId" | "contactId"> & {
    account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
  })[]
> => {
  if (!accountId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  const contacts = await listContacts(database, {
    accountId,
  });

  return [...contacts];
};
