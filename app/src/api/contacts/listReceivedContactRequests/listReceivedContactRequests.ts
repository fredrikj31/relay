import { apiClient } from "../../client";
import { User, UserSchema } from "../../../types/User";
import { ContactRequest, ContactRequestSchema } from "../../../types/Contact";

export const listReceivedContactRequests = async (): Promise<
  (Pick<
    ContactRequest,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
    | "senderAccountId"
    | "status"
  > & {
    user: User;
  })[]
> => {
  try {
    const { data } = await apiClient.get("/contacts/requests/received");
    return ContactRequestSchema.pick({
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      senderAccountId: true,
      status: true,
    })
      .extend({
        user: UserSchema,
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list received contacts requests", error);
    throw error;
  }
};
