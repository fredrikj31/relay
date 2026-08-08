import { authClient } from "../../../auth/auth";

export const logout = async (): Promise<void> => {
  try {
    await authClient.signOut();
  } catch (error) {
    console.error("Failed to logout user", error);
    throw error;
  }
};
