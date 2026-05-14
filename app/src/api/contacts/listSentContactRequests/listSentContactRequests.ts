import { apiClient } from "../../client";
import { Account, AccountSchema } from "../../../types/Account";
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
    account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
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
        account: AccountSchema.pick({
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        }),
      })
      .array()
      .parse(data);
  } catch (error) {
    console.error("Failed to list sent contacts requests", error);
    throw error;
  }
};
