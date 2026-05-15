import { apiClient } from "../../client";
import { ContactRequest, ContactRequestSchema } from "../../../types/Contact";

export const sendContactRequest = async (
  username: string,
): Promise<ContactRequest> => {
  try {
    const { data } = await apiClient.post("/contacts/requests", { username });
    return ContactRequestSchema.parse(data);
  } catch (error) {
    console.error("Failed to send contact request", error);
    throw error;
  }
};
