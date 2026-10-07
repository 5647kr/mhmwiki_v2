import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchData, fetchOneData } from "../lib/api";

export function useQueriesHook() {
  const [series, type, weak] = useQueries({
    queries: [
      {
        queryKey: ["series"],
        queryFn: () => fetchData("series"),
        staleTime: Infinity,
      },
      {
        queryKey: ["type"],
        queryFn: () => fetchData("type"),
        staleTime: Infinity,
      },
      {
        queryKey: ["weak"],
        queryFn: () => fetchData("weak"),
        staleTime: Infinity,
      },
    ],
  });

  return { series, type, weak };
}

export function useQueryHook({ table }: { table: string }) {
  return useQuery({
    queryKey: [table],
    queryFn: () => fetchData(table),
    staleTime: Infinity,
    enabled: !!table,
  });
}

export function useOneQueryHook({
  id,
  search,
  randomNum,
}: {
  id?: string;
  search?: string;
  randomNum?: number;
}) {
  return useQuery({
    queryKey: ["content", id, search, randomNum],
    queryFn: () => fetchOneData({ id, search, randomNum }),
    staleTime: 60 * 10 * 3,
    enabled: !!id || !!search || !!randomNum,
  });
}
