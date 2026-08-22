import { apiClient } from "../../client";
import { User, UserSchema } from "../../../types/User";
import { Contact, ContactSchema } from "../../../types/Contact";
import z from "zod";

export const listContacts = async (): Promise<
  { contact: Contact; user: User }[]
> => {
  try {
    const { data } = await apiClient.get("/contacts");
    return z
      .object({
        contact: ContactSchema,
        user: UserSchema,
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list contacts", error);
    throw error;
  }
};
