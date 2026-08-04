import { defineRelations } from "drizzle-orm";
import { account, session, user, verification } from "./schemas/auth";

export const relations = defineRelations(
  { user, session, account, verification },
  (r) => ({
    user: {
      sessions: r.many.session(),
      accounts: r.many.account(),
    },
    session: {
      user: r.one.user({
        from: r.session.userId,
        to: r.user.id,
      }),
    },
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
      }),
    },
  }),
);
