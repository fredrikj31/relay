import { useQuery } from "@tanstack/react-query";
import { listReceivedContactRequests } from "./listReceivedContactRequests";

export const useListReceivedContactRequests = () => {
  return useQuery({
    queryKey: ["contacts", "requests", "received"],
    queryFn: () => listReceivedContactRequests(),
    retry: 3,
    staleTime: 300_000, // 5 minutes
  });
};
