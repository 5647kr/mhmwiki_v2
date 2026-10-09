import { ArrowRight } from "lucide-react";
import { useWorldCupStore } from "../../store/worldcupStore";
import { useQueriesHook } from "../../hook/useQueryHook";

import FilterList from "../worldcup/FilterList";

export default function Settings({
  contentsLength,
  isFetching,
}: {
  contentsLength: number;
  isFetching: boolean;
}) {
  const cupType = useWorldCupStore((state) => state.cupType);
  const round = useWorldCupStore((state) => state.round);
  const handleType = useWorldCupStore((state) => state.handleType);
  const handleRound = useWorldCupStore((state) => state.handleRound);
  const handleStatus = useWorldCupStore((state) => state.handleStatus);

  const { series, type } = useQueriesHook();

  return (
    <>
      {/* 전체 vs 커스텀 */}
      <div className="flex gap-5 mt-10">
        <div className="w-full">
          <label
            className={`${cupType === "all" ? "border-(--red) bg-(--cream)" : "border-(--lgrey) bg-(--white)"} border w-full py-5 px-2.5 cursor-pointer flex flex-col gap-2.5 relative`}>
            <strong
              className={`${cupType === "all" ? "text-(--black)" : "text-(--grey)"} subHeadingTitle font-bold`}>
              전체
            </strong>
            <p
              className={`${cupType === "all" ? "text-(--black)" : "text-(--grey)"} small`}>
              전체 몬스터에서 무작위 구성
            </p>
            <input
              type="radio"
              name="type"
              value="all"
              className="absolute top-5 right-5 accent-(--red)"
              checked={cupType === "all"}
              onChange={() => handleType("all")}
            />
          </label>
        </div>
        <div className="w-full">
          <label
            className={`${cupType === "custom" ? "border-(--red) bg-(--cream)" : "border-(--lgrey) bg-(--white)"} border w-full py-5 px-2.5 cursor-pointer flex flex-col gap-2.5 relative`}>
            <strong
              className={`${cupType === "custom" ? "text-(--black)" : "text-(--grey)"} subHeadingTitle font-bold`}>
              커스텀
            </strong>
            <p
              className={`${cupType === "custom" ? "text-(--black)" : "text-(--grey)"} small`}>
              시리즈와 종별을 직접 설정
            </p>
            <input
              type="radio"
              name="type"
              value="custom"
              className="absolute top-5 right-5 accent-(--red)"
              checked={cupType === "custom"}
              onChange={() => handleType("custom")}
            />
          </label>
        </div>
      </div>

      {/* 상세설정 */}
      <div className="mt-10">
        {cupType === "all" ? (
          <>
            <h3 className="subParagraph mb-5">토너먼트 규모</h3>
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-4">
              <li className="border border-(--lgrey)">
                <label
                  className={`flex justify-center items-center p-10 cursor-pointer ${round === "16" ? "bg-(--black) text-(--white)" : "bg-(--white) text-(--black)"}`}>
                  <span className="subTitle font-bold">16강</span>
                  <input
                    type="radio"
                    name="round"
                    value="16"
                    className="a11y-hidden"
                    onChange={() => handleRound("16")}
                  />
                </label>
              </li>
              <li className="border border-(--lgrey)">
                <label
                  className={`flex justify-center items-center p-10 cursor-pointer ${round === "32" ? "bg-(--black) text-(--white)" : "bg-(--white) text-(--black)"}`}>
                  <span className="subTitle font-bold">32강</span>
                  <input
                    type="radio"
                    name="round"
                    value="32"
                    className="a11y-hidden"
                    onChange={() => handleRound("32")}
                  />
                </label>
              </li>
              <li className="border border-(--lgrey)">
                <label
                  className={`flex justify-center items-center p-10 cursor-pointer ${round === "64" ? "bg-(--black) text-(--white)" : "bg-(--white) text-(--black)"}`}>
                  <span className="subTitle font-bold">64강</span>
                  <input
                    type="radio"
                    name="round"
                    value="64"
                    className="a11y-hidden"
                    onChange={() => handleRound("64")}
                  />
                </label>
              </li>
              <li className="border border-(--lgrey)">
                <label
                  className={`flex justify-center items-center p-10 cursor-pointer ${round === "allContent" ? "bg-(--black) text-(--white)" : "bg-(--white) text-(--black)"}`}>
                  <span className="subTitle font-bold">전체</span>
                  <input
                    type="radio"
                    name="round"
                    value="allContent"
                    className="a11y-hidden"
                    onChange={() => handleRound("allContent")}
                  />
                </label>
              </li>
            </ul>
          </>
        ) : (
          <>
            <div>
              <h3 className="subParagraph mb-2.5">시리즈 선택</h3>
              <FilterList list={series.data} table="series" />
            </div>
            <div className="mt-5">
              <h3 className="subParagraph mb-2.5">종별 선택</h3>
              <FilterList list={type.data} table="type" />
            </div>

            <div className="mt-10 bg-(--black) p-5 border-l-4 border-(--red)">
              <span className="text-(--red) small">자동 생성</span>
              <h4 className="text-(--white) subTitle mt-2.5 mb-5">
                {isFetching
                  ? "강수 계산 중..."
                  : contentsLength >= 2
                    ? `${Math.ceil(contentsLength / 2)}강 시작하기`
                    : "조건에 맞는 몬스터를 2종 이상 선택해주세요."}
              </h4>
              <p className="text-(--grey) ">
                선택 조건에 해당하는 몬스터 <span>{contentsLength}종</span>
              </p>
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        disabled={contentsLength < 16}
        onClick={() => handleStatus("progress")}
        className="bg-(--red) disabled:bg-(--grey) text-(--white) disabled:text-(--dgrey) flex justify-between items-center py-3 px-5 w-full mt-10 disabled:cursor-not-allowed transition-colors">
        <div className="flex flex-col items-start text-left">
          {contentsLength < 16 ? (
            <span className="subParagraph">
              최소 16종 이상의 몬스터가 필요합니다. (현재 {contentsLength}종)
            </span>
          ) : (
            <span className="subParagraph">
              {cupType === "custom"
                ? `${Math.ceil(contentsLength / 2)}강 시작하기`
                : round === "allContent"
                  ? "전체로 시작하기"
                  : `${round}강 시작하기`}
            </span>
          )}
        </div>

        <ArrowRight />
      </button>
    </>
  );
}
