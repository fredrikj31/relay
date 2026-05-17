import { apiClient } from "../../client";
import { ContactRequest, ContactRequestSchema } from "../../../types/Contact";

export const deleteContactRequest = async (
  contactId: string,
): Promise<ContactRequest> => {
  try {
    const { data } = await apiClient.delete(`/contacts/requests/${contactId}`);
    return ContactRequestSchema.parse(data);
  } catch (error) {
    console.error("Failed to delete contact request", error);
    throw error;
  }
};
