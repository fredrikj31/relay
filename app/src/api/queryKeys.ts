export const queryKeys = {
  currentAccount: ["accounts", "me"] as const,
  contacts: {
    requests: {
      received: ["contacts", "requests", "received"] as const,
      sent: ["contacts", "requests", "sent"] as const,
    },
  },
};
