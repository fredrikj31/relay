import { CommonQueryMethods } from "slonik";
import { Account } from "../../../types/account";
import { getAccountById } from "../../../services/database/queries/user/getUserById";
import { UnauthorizedError } from "../../../errors/client";

interface GetCurrentAccountHandlerOptions {
  database: CommonQueryMethods;
  accountId: string | undefined;
}
export const getCurrentAccountHandler = async ({
  database,
  accountId,
}: GetCurrentAccountHandlerOptions): Promise<Account> => {
  if (!accountId) {
    throw new UnauthorizedError({
      code: "account-id-not-found-in-request",
      message: "A account id wasn't found in the request object",
    });
  }

  return await getAccountById(database, {
    id: accountId,
  });
};
