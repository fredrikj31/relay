import { useQuery } from "@tanstack/react-query";
import { listContacts } from "./listContacts";
import { queryKeys } from "../../queryKeys";

export const useListContacts = () => {
  return useQuery({
    queryKey: queryKeys.contacts.list,
    queryFn: () => listContacts(),
    retry: 3,
    staleTime: 300_000, // 5 minutes
  });
};
