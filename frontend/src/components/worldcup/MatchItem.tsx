import { ArrowRight } from "lucide-react";
import unknownIcon from "/icons/unkown.webp";
import { useState } from "react";

export default function MatchItem({
  content,
  handleSelectWinner,
  isByeMatch,
}: {
  content: Content;
  handleSelectWinner: (winner: Content) => void;
  isByeMatch: boolean;
}) {
  const imgUrl = import.meta.env.VITE_IMG_URL;

  const [isLoaded, setIsLoaded] = useState(false);
  const targetImgSrc = `${imgUrl}${content.img}`;

  const handleClick = () => {
    // 이미지 로딩 완료 전에 클릭 방지
    if (!isLoaded) return;
    handleSelectWinner(content);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full border border-(--lgrey) bg-(--cream) flex flex-col items-center justify-between transition-all duration-500 relative overflow-hidden ${
        isLoaded
          ? "hover:border-(--red) hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(46,48,40,.12)] cursor-pointer group"
          : "cursor-wait opacity-90"
      }`}>
      {/* 1. 이미지 영역 */}
      <div className="py-10 flex justify-center items-center h-80 bg-(--cream) w-full relative">
        {/* 실제 몬스터 이미지 (항상 DOM에 배치하여 onLoad 감지) */}
        <img
          src={targetImgSrc}
          alt={content.name}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`max-h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "block opacity-100" : "hidden opacity-0"
          }`}
        />

        {/* 로딩 완료 전 unknownIcon 스켈레톤 노출 */}
        {!isLoaded && (
          <img
            src={unknownIcon}
            alt="불러오는 중..."
            className="max-h-full object-contain animate-pulse"
          />
        )}
      </div>

      {/* 2. 정보 텍스트 영역 */}
      <div className="w-full p-5 bg-(--white)">
        {!isLoaded ? (
          /* 스켈레톤 로딩 텍스트 */
          <>
            <div className="flex gap-2.5">
              <span className="w-15 h-5 bg-(--lgrey) animate-pulse" />
              <span className="w-15 h-5 bg-(--lgrey) animate-pulse" />
            </div>
            <div className="h-7 bg-(--lgrey) animate-pulse my-2.5" />
          </>
        ) : (
          /* 실제 텍스트 정보 */
          <div>
            <div>
              {content.nickname1 && (
                <span className="small text-(--grey)">
                  {content.nickname1.split("/")[0]} ·{" "}
                </span>
              )}
              <span className="small text-(--grey)">
                {content.type.split("/")[0]}
              </span>
            </div>
            <h5 className="paragraph font-bold my-2.5">{content.name}</h5>
          </div>
        )}
      </div>

      {/* 3. 하단 버튼 */}
      <button
        type="button"
        disabled={!isLoaded}
        className="w-full bg-(--black) text-(--white) group-hover:bg-(--red) py-3 px-5 flex justify-between items-center transition-colors disabled:bg-(--grey) disabled:cursor-wait">
        <span className="subParagraph font-bold">
          {!isLoaded
            ? "불러오는 중..."
            : isByeMatch
              ? "부전승 진출하기"
              : "선택하기"}
        </span>
        <ArrowRight />
      </button>
    </div>
  );
}
