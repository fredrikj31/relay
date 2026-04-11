import { apiClient } from "../../client";
import { Account } from "../../../types/Account";

export const login = async (
  account: Pick<Account, "email" | "password">,
): Promise<void> => {
  try {
    await apiClient.post("/login", account);
  } catch (error) {
    console.error("Failed to login user", error);
    throw error;
  }
};
