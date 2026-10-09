import { useState } from "react";
import { useWorldCupStore } from "../../store/worldcupStore";
import shuffle from "../../lib/shuffle";
import MatchItem from "./MatchItem";

export default function Progress({ contents }: { contents: Content[] }) {
  const cupType = useWorldCupStore((state) => state.cupType);
  const round = useWorldCupStore((state) => state.round);
  const handleStatus = useWorldCupStore((state) => state.handleStatus);
  const handleWinner = useWorldCupStore((state) => state.handleWinner);

  // 1. 초기 참가 몬스터 셔플 (모든 데이터 유지)
  const [currentRoundContents, setCurrentRoundContents] = useState<Content[]>(
    () => {
      const shuffledList = shuffle(contents);

      if (cupType === "all") {
        switch (round) {
          case "16":
            return shuffledList.slice(0, 16);
          case "32":
            return shuffledList.slice(0, 32);
          case "64":
            return shuffledList.slice(0, 64);
          case "allContent":
          default:
            return shuffledList;
        }
      }
      return shuffledList;
    },
  );

  const [nextRoundContents, setNextRoundContents] = useState<Content[]>([]);
  const [matchIndex, setMatchIndex] = useState(0);

  // 현재 대결 몬스터 (홀수인 경우 contentB는 undefined)
  const contentA = currentRoundContents[matchIndex];
  const contentB = currentRoundContents[matchIndex + 1];

  // 홀수 부전승 매치 여부 판별
  const isByeMatch = !contentB && !!contentA;

  // 현재 라운드 총 대결 수 및 진행 경기 번호
  const totalMatchesInRound = Math.ceil(currentRoundContents.length / 2);
  const currentMatchNumber = Math.floor(matchIndex / 2) + 1;

  // 2. 승자 선택 핸들러
  const handleSelectWinner = (winner: Content) => {
    const updatedNextRound = [...nextRoundContents, winner];

    // 현재 라운드의 마지막 경기(홀수 부전승 포함)가 종료되었는지 확인
    if (matchIndex + 2 >= currentRoundContents.length || isByeMatch) {
      // 결승전인 경우 (2마리 중 1마리 선택 완료)
      if (currentRoundContents.length === 2) {
        handleWinner(winner);
        handleStatus("result");
        return;
      }

      // 다음 라운드로 전환 (승자들 무작위 셔플)
      setCurrentRoundContents(shuffle(updatedNextRound));
      setNextRoundContents([]);
      setMatchIndex(0);
    } else {
      // 다음 매치로 이동
      setNextRoundContents(updatedNextRound);
      setMatchIndex((prev) => prev + 2);
    }
  };

  if (!contentA) return null;

  return (
    <div className="w-full mt-5">
      {/* 헤더 안내 */}
      <div className="flex justify-between items-end pb-4 border-b border-(--lgrey) mb-10">
        <div>
          <h3 className="subTitle font-bold">
            {currentRoundContents.length === 2
              ? "결승전 (FINAL)"
              : `${currentRoundContents.length}강 (${currentMatchNumber}/${totalMatchesInRound}경기)`}
            {isByeMatch && " - 부전승 매치"}
          </h3>
        </div>
        <div className="text-right">
          <span className="small text-(--grey)">
            진행률{" "}
            {Math.round((currentMatchNumber / totalMatchesInRound) * 100)}%
          </span>
        </div>
      </div>
      {/* 2개 대결 카드 영역 */}

      <div className="flex justify-center gap-5 relative w-full md:w-[80%] md:mx-auto">
        {/* VS 배지 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-(--red) text-(--white) font-black text-2xl w-14 h-14 rounded-full flex items-center justify-center border-4 border-(--white) shadow-lg pointer-events-none">
          VS
        </div>

        {/* 몬스터 A 카드 (항상 표시) */}
        <MatchItem
          key={contentA.id}
          content={contentA}
          handleSelectWinner={handleSelectWinner}
          isByeMatch={isByeMatch}
          />

        {/* 몬스터 B 카드 OR 부전승 안내 카드 */}
        {contentB ? (
          <MatchItem
          key={contentB.id}
            content={contentB}
            handleSelectWinner={handleSelectWinner}
            isByeMatch={isByeMatch}
          />
        ) : (
          /* 💡 contentB 부전승 안내 카드 UI */
          <div className="w-full border border-dashed border-(--grey) bg-(--cream) p-10 flex flex-col items-center justify-center text-center relative">
            <h4 className="subTitle font-bold text-(--black) mb-2">
              대결 상대 없음 (부전승)
            </h4>
            <p className="subParagraph text-(--grey) mb-5">
              이번 라운드의 참가 몬스터 수가 홀수입니다.
              <br />
              왼쪽의 <strong>[{contentA.name}]</strong> 몬스터를 선택하여 다음
              라운드로 진출시켜 주세요.
            </p>
            <div className="small text-(--red) font-bold bg-(--white) px-4 py-2 border border-(--red)">
              왼쪽 몬스터 선택 필요
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => handleStatus("settings")}
          className="small text-(--grey) border-b border-(--grey)">
          토너먼트 나가기
        </button>
      </div>
    </div>
  );
}
