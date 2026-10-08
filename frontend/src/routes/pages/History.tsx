import HistoryList from "../../components/history/HistoryList";
import HistorySkeleton from "../../components/history/HistorySkeleton";
import { useQueryHook } from "../../hook/useQueryHook";

export default function History() {
  const { data: series, isFetching } = useQueryHook({
    table: "series",
    sort: "open",
    order: "asc",
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-5 ">
      <div className="py-10">
        {/* title */}
        <div>
          <div>
            <h2 className="heading">몬스터 헌터 연혁</h2>
            <h3 className="subTitle mt-2.5 mb-5">22년의 사냥, 그 기록</h3>
            <p className="small text-(--grey)">
              모든 작품은 최초 출시일이 기준이므로, 플랫폼마다 출시일이 다를 수
              있습니다.
            </p>
          </div>
        </div>

        {/* history */}
        <div className="mt-10 border-t border-(--black)">
          {isFetching ? (
            <ul>
              {Array.from({ length: 19 }).map((_, index) => (
                <li key={index} className="mt-20">
                  <HistorySkeleton />
                </li>
              ))}
            </ul>
          ) : (
            <HistoryList series={series} />
          )}
        </div>
      </div>
    </section>
  );
}
