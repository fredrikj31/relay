import { apiClient } from "../../client";
import { User, UserSchema } from "../../../types/User";
import {
  ContactRequest,
  ContactRequestSchema,
} from "../../../types/ContactRequest";
import z from "zod";

export const listReceivedContactRequests = async (): Promise<
  { contactRequest: ContactRequest; user: User }[]
> => {
  try {
    const { data } = await apiClient.get("/contacts/requests/received");
    return z
      .object({
        contactRequest: ContactRequestSchema,
        user: UserSchema,
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list received contacts requests", error);
    throw error;
  }
};
