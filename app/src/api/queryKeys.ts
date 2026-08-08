export const queryKeys = {
  contacts: {
    list: ["contacts", "list"] as const,
    requests: {
      received: ["contacts", "requests", "received"] as const,
      sent: ["contacts", "requests", "sent"] as const,
    },
  },
};
