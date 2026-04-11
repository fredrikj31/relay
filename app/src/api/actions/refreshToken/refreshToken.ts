import { apiClient } from "../../client";

export const refreshToken = async (refreshToken: string): Promise<void> => {
  try {
    await apiClient.post("/token", { refreshToken });
  } catch (error) {
    console.error("Failed to sign up user", error);
    throw error;
  }
};
