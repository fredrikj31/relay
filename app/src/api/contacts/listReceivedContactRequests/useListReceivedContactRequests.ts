import { useQuery } from "@tanstack/react-query";
import { listReceivedContactRequests } from "./listReceivedContactRequests";
import { queryKeys } from "../../queryKeys";

export const useListReceivedContactRequests = () => {
  return useQuery({
    queryKey: queryKeys.contacts.requests.received,
    queryFn: () => listReceivedContactRequests(),
    retry: 3,
    staleTime: 300_000, // 5 minutes
  });
};
