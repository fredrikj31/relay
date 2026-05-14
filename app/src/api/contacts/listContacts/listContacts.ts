import { apiClient } from "../../client";
import { Account, AccountSchema } from "../../../types/Account";
import { Contact, ContactSchema } from "../../../types/Contact";

export const listContacts = async (): Promise<
  (Pick<Contact, "id" | "createdAt" | "updatedAt" | "deletedAt"> & {
    account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
  })[]
> => {
  try {
    const { data } = await apiClient.get("/contacts");
    return ContactSchema.pick({
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    })
      .extend({
        account: AccountSchema.pick({
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        }),
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list contacts", error);
    throw error;
  }
};
