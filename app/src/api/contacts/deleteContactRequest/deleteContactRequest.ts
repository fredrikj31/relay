import { apiClient } from "../../client";
import { ContactRequest, ContactRequestSchema } from "../../../types/Contact";

export const deleteContactRequest = async (
  contactRequestId: string,
): Promise<ContactRequest> => {
  try {
    const { data } = await apiClient.delete(
      `/contacts/requests/${contactRequestId}`,
    );
    return ContactRequestSchema.parse(data);
  } catch (error) {
    console.error("Failed to delete contact request", error);
    throw error;
  }
};
