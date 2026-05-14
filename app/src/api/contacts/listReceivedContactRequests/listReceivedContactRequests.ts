import { apiClient } from "../../client";
import { Account, AccountSchema } from "../../../types/Account";
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
    account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
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
    console.error("Failed to list received contacts requests", error);
    throw error;
  }
};
