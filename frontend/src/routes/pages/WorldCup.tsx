import { useEffect } from "react";
import Progress from "../../components/worldcup/Progress";
import Result from "../../components/worldcup/Result";
import Settings from "../../components/worldcup/Settings";
import { useWorldCupQueryHook } from "../../hook/useQueryHook";
import { useWorldCupStore } from "../../store/worldcupStore";

export default function WorldCup() {
  const status = useWorldCupStore((state) => state.status);
  const custom = useWorldCupStore((state) => state.custom);
  const handleStatus = useWorldCupStore((state) => state.handleStatus);
  const { data: contents, isFetching } = useWorldCupQueryHook({
    table: "monster",
    custom: custom,
  });

  useEffect(() => {
    handleStatus("settings");
  }, [handleStatus]);

  // 데이터 수
  const contentsLength = contents?.length;

  return (
    <div className="w-full max-w-7xl mx-auto px-5 ">
      <div className="py-10">
        <div>
          {status === "settings" && (
            <>
              <h2 className="heading mb-5">몬스터 이상형 월드컵</h2>
              <h3 className="subTitle mt-2.5 pb-5 border-b border-(--black)">
                월드컵 설정
              </h3>
            </>
          )}
        </div>

        {/* step1: settings */}
        {status === "settings" && (
          <Settings contentsLength={contentsLength} isFetching={isFetching} />
        )}

        {/* step2: progress */}
        {status === "progress" && <Progress contents={contents} />}

        {/* step3: result */}
        {status === "result" && <Result />}
      </div>
    </div>
  );
}
