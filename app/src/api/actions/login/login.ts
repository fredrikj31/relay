import { User } from "better-auth";
import { authClient } from "../../../auth/auth";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> => {
  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.error("Failed to login user", error);
      return null;
    }

    return data?.user ?? null;
  } catch (error) {
    console.error("Failed to login user", error);
    throw error;
  }
};
