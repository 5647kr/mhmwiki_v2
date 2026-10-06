import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchContent } from "../lib/api";

export default function useInfiniteQueryHook(filterState: {
  series: string[];
  type: string[];
  weak: string[];
}) {
  return useInfiniteQuery({
    queryKey: ["content", filterState],
    queryFn: ({ pageParam }) => {
      return fetchContent({
        page: pageParam,
        pageNum: 20,
        filterState: filterState,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    staleTime: 60 * 10 * 3
  });
}
