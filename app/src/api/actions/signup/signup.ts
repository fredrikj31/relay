import { apiClient } from "../../client";
import { Account, AccountSchema } from "../../../types/Account";

export const signup = async (
  account: Pick<
    Account,
    "email" | "username" | "firstName" | "lastName" | "password"
  >,
): Promise<
  Omit<
    Account,
    "createdAt" | "updatedAt" | "deletedAt" | "password" | "passwordSalt"
  >
> => {
  try {
    const { data } = await apiClient.post("/signup", account);
    return AccountSchema.omit({
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      password: true,
      passwordSalt: true,
    }).parse(data);
  } catch (error) {
    console.error("Failed to sign up user", error);
    throw error;
  }
};
