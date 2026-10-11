import HistoryList from "../../components/history/HistoryList";
import HistorySkeleton from "../../components/history/HistorySkeleton";
import { useHistoryQuery } from "../../hooks/useHistoryQuery";

export default function History() {
  const { data: series, isFetching } = useHistoryQuery();

  return (
    <>
      <section className="py-10 bg-(--cream)">
        <div className="w-full max-w-7xl mx-auto px-5">
          <h2 className="heading mb-5">몬스터 헌터 연혁</h2>
          <h3 className="subTitle">22년의 사냥, 그 기록</h3>
          <p className="paragraph text-(--grey) mt-2.5">
            모든 작품은 최초 출시일이 기준이므로, 플랫폼마다 출시일이 다를 수
            있습니다.
          </p>
        </div>
      </section>
      {/* history */}
      <div className="w-full max-w-7xl mx-auto px-5 py-10">
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
    </>
  );
}
