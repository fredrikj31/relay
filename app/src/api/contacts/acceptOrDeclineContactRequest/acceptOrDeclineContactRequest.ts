import { apiClient } from "../../client";
import { ContactRequest, ContactRequestSchema } from "../../../types/Contact";

export const acceptOrDeclineContactRequest = async ({
  contactRequestId,
  status,
}: {
  contactRequestId: string;
  status: "accepted" | "declined";
}): Promise<ContactRequest> => {
  try {
    const { data } = await apiClient.put(
      `/contacts/requests/${contactRequestId}`,
      { status },
    );
    return ContactRequestSchema.parse(data);
  } catch (error) {
    console.error("Failed to accept or decline contact request", error);
    throw error;
  }
};
