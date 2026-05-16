import { useQuery } from "@tanstack/react-query";
import { getCurrentAccount } from "./getCurrentAccount";
import { queryKeys } from "../../queryKeys";

export const useGetCurrentAccount = () => {
  return useQuery({
    queryKey: queryKeys.currentAccount,
    queryFn: () => getCurrentAccount(),
    retry: 3,
    staleTime: 300_000, // 5 minutes
  });
};
