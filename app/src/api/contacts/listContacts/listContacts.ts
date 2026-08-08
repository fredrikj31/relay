import { apiClient } from "../../client";
import { User, UserSchema } from "../../../types/User";
import { Contact, ContactSchema } from "../../../types/Contact";

export const listContacts = async (): Promise<
  (Pick<Contact, "id" | "createdAt" | "updatedAt" | "deletedAt"> & {
    user: User;
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
        user: UserSchema,
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list contacts", error);
    throw error;
  }
};
