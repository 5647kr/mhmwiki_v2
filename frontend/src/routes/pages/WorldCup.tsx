import { useEffect } from "react";
import Progress from "../../components/worldcup/Progress";
import Result from "../../components/worldcup/Result";
import Settings from "../../components/worldcup/Settings";
import { useWorldCupStore } from "../../store/worldcupStore";
import { useCustomQuery } from "../../hooks/useContentQuery";

export default function WorldCup() {
  const status = useWorldCupStore((state) => state.status);
  const custom = useWorldCupStore((state) => state.custom);
  const handleStatus = useWorldCupStore((state) => state.handleStatus);
  const { data: contents, isFetching } = useCustomQuery({
    type: "worldCup",
    custom: custom,
  });

  useEffect(() => {
    handleStatus("settings");
  }, [handleStatus]);

  // 데이터 수
  const contentsLength = contents?.length;

  return (
    <>
      <title>MHMWIKI - 월드컵</title>
      {status === "settings" && (
        <section className="py-10 bg-(--cream)">
          <div className="w-full max-w-7xl mx-auto px-5">
            <h2 className="heading mb-5">몬스터 이상형 월드컵</h2>
            <p className="paragraph text-(--grey) mt-2.5">
              두 몬스터 중 더 마음에 드는 하나를 선택하세요. 선택받은 몬스터만
              다음 라운드로 진출합니다.
            </p>
          </div>
        </section>
      )}

      <div className="w-full max-w-7xl mx-auto px-5 py-10">
        {/* step1: settings */}
        {status === "settings" && (
          <Settings contentsLength={contentsLength} isFetching={isFetching} />
        )}

        {/* step2: progress */}
        {status === "progress" && <Progress contents={contents} />}

        {/* step3: result */}
        {status === "result" && <Result />}
      </div>
    </>
  );
}
