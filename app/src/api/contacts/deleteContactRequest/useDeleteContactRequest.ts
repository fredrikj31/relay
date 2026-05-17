import { useMutation } from "@tanstack/react-query";
import { deleteContactRequest } from "./deleteContactRequest";

export const useDeleteContactRequest = () => {
  return useMutation({
    mutationFn: (contactId: Parameters<typeof deleteContactRequest>[0]) => {
      return deleteContactRequest(contactId);
    },
  });
};
