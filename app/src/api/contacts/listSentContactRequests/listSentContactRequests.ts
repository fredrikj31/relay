import { apiClient } from "../../client";
import { User, UserSchema } from "../../../types/User";
import { ContactRequest, ContactRequestSchema } from "../../../types/Contact";

export const listSentContactRequests = async (): Promise<
  (Pick<
    ContactRequest,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
    | "receiverAccountId"
    | "status"
  > & {
    user: User;
  })[]
> => {
  try {
    const { data } = await apiClient.get("/contacts/requests/sent");
    return ContactRequestSchema.pick({
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      receiverAccountId: true,
      status: true,
    })
      .extend({
        user: UserSchema,
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list sent contacts requests", error);
    throw error;
  }
};
