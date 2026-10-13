import { useQuery } from "@tanstack/react-query";
import { fetchHistory } from "../api/history";

export function useHistoryQuery() {
  return useQuery({
    queryKey: ["series", "history"],
    queryFn: fetchHistory,
    staleTime: Infinity,
  });
}
