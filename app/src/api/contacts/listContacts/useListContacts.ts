import { useQuery } from "@tanstack/react-query";
import { listContacts } from "./listContacts";

export const useListContacts = () => {
  return useQuery({
    queryKey: ["contacts", "list"],
    queryFn: () => listContacts(),
    retry: 3,
    staleTime: 300_000, // 5 minutes
  });
};
