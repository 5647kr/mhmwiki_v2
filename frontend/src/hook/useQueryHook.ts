import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchData, fetchOneData } from "../lib/api";

export function useQueriesHook() {
  const [series, type, weak] = useQueries({
    queries: [
      {
        queryKey: ["series"],
        queryFn: () => fetchData({ table: "series" }),
        staleTime: Infinity,
      },
      {
        queryKey: ["type"],
        queryFn: () => fetchData({ table: "type" }),
        staleTime: Infinity,
      },
      {
        queryKey: ["weak"],
        queryFn: () => fetchData({ table: "weak" }),
        staleTime: Infinity,
      },
    ],
  });

  return { series, type, weak };
}

export function useQueryHook({
  table,
  sort,
  order,
}: {
  table: string;
  sort?: string;
  order?: string;
}) {
  return useQuery({
    queryKey: [table],
    queryFn: () => fetchData({ table, sort, order }),
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
