import { useQuery } from "@tanstack/react-query";
import { listSentContactRequests } from "./listSentContactRequests";

export const useListSentContactRequests = () => {
  return useQuery({
    queryKey: ["contacts", "requests", "sent"],
    queryFn: () => listSentContactRequests(),
    retry: 3,
    staleTime: 300_000, // 5 minutes
  });
};
