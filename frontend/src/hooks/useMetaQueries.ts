// 시리즈 && 타입 && 약점 데이터 조회
import { useQueries } from "@tanstack/react-query";
import fetchMetaData from "../api/meta";

interface TableProps {
  enableSeries?: boolean;
  enableType?: boolean;
  enableWeak?: boolean;
}

export default function useMetaQueries(table: TableProps = {}) {
  const { enableSeries = true, enableType = true, enableWeak = true } = table;

  const [series, type, weak] = useQueries({
    queries: [
      {
        queryKey: ["series"],
        queryFn: () => fetchMetaData({ table: "series" }),
        staleTime: Infinity,
        enabled: enableSeries,
      },
      {
        queryKey: ["type"],
        queryFn: () => fetchMetaData({ table: "type" }),
        staleTime: Infinity,
        enabled: enableType,
      },
      {
        queryKey: ["weak"],
        queryFn: () => fetchMetaData({ table: "weak" }),
        staleTime: Infinity,
        enabled: enableWeak,
      },
    ],
  });

  return { series, type, weak };
}
