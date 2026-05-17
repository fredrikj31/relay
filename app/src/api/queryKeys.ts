export const queryKeys = {
  currentAccount: ["accounts", "me"] as const,
  contacts: {
    list: ["contacts", "list"] as const,
    requests: {
      received: ["contacts", "requests", "received"] as const,
      sent: ["contacts", "requests", "sent"] as const,
    },
  },
};
