import { useMutation } from "@tanstack/react-query";
import { acceptOrDeclineContactRequest } from "./acceptOrDeclineContactRequest";

export const useAcceptOrDeclineContactRequest = () => {
  return useMutation({
    mutationFn: ({
      contactRequestId,
      status,
    }: Parameters<typeof acceptOrDeclineContactRequest>[0]) => {
      return acceptOrDeclineContactRequest({ contactRequestId, status });
    },
  });
};
