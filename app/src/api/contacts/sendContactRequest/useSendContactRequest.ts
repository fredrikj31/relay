import { useMutation } from "@tanstack/react-query";
import { sendContactRequest } from "./sendContactRequest";

export const useSendContactRequest = () => {
  return useMutation({
    mutationFn: (username: Parameters<typeof sendContactRequest>[0]) => {
      return sendContactRequest(username);
    },
  });
};
