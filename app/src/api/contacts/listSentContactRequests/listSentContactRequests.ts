import { apiClient } from "../../client";
import { User, UserSchema } from "../../../types/User";
import { ContactRequest, ContactRequestSchema } from "../../../types/Contact";
import z from "zod";

export const listSentContactRequests = async (): Promise<
  { contactRequest: ContactRequest; user: User }[]
> => {
  try {
    const { data } = await apiClient.get("/contacts/requests/sent");
    return z
      .object({
        contactRequest: ContactRequestSchema,
        user: UserSchema,
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list sent contacts requests", error);
    throw error;
  }
};
