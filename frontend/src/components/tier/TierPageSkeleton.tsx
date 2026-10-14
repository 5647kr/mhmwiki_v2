import { ChevronUp } from "lucide-react";
import TierType from "./TierType";

export default function TierPageSkeleton() {
  return (
    <>
      <title>MHMWIKI - 티어표</title>
      {/* title */}
      <section className="py-10 bg-(--cream)">
        <div className="w-full max-w-7xl mx-auto px-5">
          <h2 className="heading mb-5">티어표 만들기</h2>
          <p className="paragraph text-(--grey) mt-2.5">
            몬스터, 무기, 작품 중 주제를 선택하고 카드를 드래그해 나만의 순위를
            완성하세요.
          </p>
        </div>
      </section>

      {/* 주제 고르기 */}
      <TierType />

      {/* 몬스터 선택 */}
      <div className="mt-5 w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center w-full">
          <h3 className="subTitle">몬스터 설정</h3>
          <div className="p-2.5">
            <ChevronUp />
          </div>
        </div>

        <div>
          <h3 className="subParagraph mb-2.5">시리즈 선택</h3>
          <div className="grid grid-cols-3 gap-5 md:flex md:flex-wrap">
            {Array.from({ length: 19 }).map((_, index) => (
              <div className="w-30 h-10.5 bg-(--lgrey)" key={index} />
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="subParagraph mb-2.5">종별 선택</h3>
          <div className="grid grid-cols-3 gap-5 md:flex md:flex-wrap">
            {Array.from({ length: 19 }).map((_, index) => (
              <div className="w-30 h-10.5 bg-(--lgrey)" key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col gap-10 my-10 h-120 bg-(--lgrey) animate-pulse" />
    </>
  );
}
