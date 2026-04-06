import { CommonQueryMethods } from "slonik";
import { doesEmailExist } from "../../../services/database/queries/user/doesEmailExist";
import { ConflictError } from "../../../errors/client";
import { randomBytes, randomUUID } from "crypto";
import { generateHash } from "../../../helpers/generateHash";
import { config } from "../../../config";
import { Account } from "../../../types/account";
import { createAccount } from "../../../services/database/queries/user/createAccount";
import { doesUsernameExist } from "../../../services/database/queries/user/doesUsernameExist";

interface SignupHandlerOptions {
  database: CommonQueryMethods;
  account: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  };
}

export const signupHandler = async ({
  database,
  account,
}: SignupHandlerOptions): Promise<
  Pick<Account, "id" | "email" | "username" | "firstName" | "lastName">
> => {
  const { email, username, firstName, lastName, password } = account;

  const isEmailTaken = await doesEmailExist(database, { email });
  if (isEmailTaken) {
    throw new ConflictError({
      code: "email-already-exists",
      message: "There is already a user signed up with that email",
    });
  }

  const isUsernameTaken = await doesUsernameExist(database, {
    username,
  });
  if (isUsernameTaken) {
    throw new ConflictError({
      code: "username-already-exists",
      message: "There is already a user signed up with that username",
    });
  }

  const id = randomUUID();
  const userSalt = randomBytes(20).toString("hex");
  const hashedPassword = generateHash({
    password: password,
    userSalt,
    salt: config.token.passwordSalt,
  });

  await createAccount(database, {
    id,
    email,
    username,
    firstName,
    lastName,
    hashedPassword,
    passwordSalt: userSalt,
  });

  return {
    id,
    email,
    username,
    firstName,
    lastName,
  };
};
