import { apiClient } from "../../client";
import { Account, AccountSchema } from "../../../types/Account";

export const getCurrentAccount = async (): Promise<
  Omit<Account, "password" | "passwordSalt">
> => {
  try {
    const { data } = await apiClient.get("/accounts/me");
    return AccountSchema.omit({
      password: true,
      passwordSalt: true,
    }).parse(data);
  } catch (error) {
    console.error("Failed to get current account", error);
    throw error;
  }
};
