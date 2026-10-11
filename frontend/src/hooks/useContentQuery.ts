import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchContent,
  fetchCustomContent,
  fetchOneContent,
  fetchRouletteContent,
} from "../api/content";

// 무한 스크롤 데이터 조회
export function useContentQuery(filterState: {
  series: string[];
  type: string[];
  weak: string[];
}) {
  return useInfiniteQuery({
    queryKey: ["content", "infinite", filterState],
    queryFn: ({ pageParam }) => {
      return fetchContent({
        page: pageParam,
        pageNum: 20,
        filterState: filterState,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    staleTime: 60 * 10 * 3,
  });
}

// 단일 데이터 조회
export function useOneContentQuery({
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
    queryFn: () => fetchOneContent({ id, search, randomNum }),
    staleTime: 60 * 10 * 3,
    enabled: !!id || !!search || !!randomNum,
  });
}

// 이상형 월드컵 & 티어 데이터 조회
export function useCustomQuery({
  type,
  custom,
}: {
  type: "worldCup" | "tier";
  custom: { series: string[]; type: string[] };
}) {
  return useQuery({
    queryKey: [type, custom],
    queryFn: () => fetchCustomContent({ custom }),
    staleTime: 60 * 10 * 3,
  });
}

// 룰렛 데이터 조회
export function useRouletteQuery({ seriesId = "r" }: { seriesId?: string }) {
  return useQuery({
    queryKey: ["content", "roulette", seriesId],
    queryFn: () => fetchRouletteContent({ seriesId }),
    staleTime: 60 * 10 * 3,
  });
}
