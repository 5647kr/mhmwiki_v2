import TierDisplay from "../../components/tier/TierDisplay";
import TierList from "../../components/tier/TierList";
import TierType from "../../components/tier/TierType";
import { DragDropProvider } from "@dnd-kit/react";
import { useTierStore } from "../../store/tierStore";
import { useQueryHook } from "../../hook/useQueryHook";
import { useMemo } from "react";

const WEAPONLIST = [
  "대검",
  "태도",
  "한손검",
  "쌍검",
  "해머",
  "수렵피리",
  "랜스",
  "건랜스",
  "슬래시액스",
  "차지액스",
  "조충곤",
  "라이트보우건",
  "헤비보우건",
  "활",
];
export default function Tier() {
  const imgUrl = import.meta.env.VITE_IMG_URL;
  const tierType = useTierStore((state) => state.tierType);
  // const setTierItems = useTierStore((state) => state.setTierItems);
  // const tierItems = useTierStore((state) => state.tierItems);
  const { data: series } = useQueryHook({
    table: "series",
  });
  const { data: contents } = useQueryHook({
    table: "monster",
  });

  const items = useMemo(() => {
    if (tierType === "monster") {
      return (contents ?? []).map((item: Content) => ({
        name: item.name,
        img: `${imgUrl}${item.img}`,
      }));
    }

    if (tierType === "weapon") {
      return WEAPONLIST.map((weapon: string) => ({
        name: weapon,
        img: `/icons/${weapon}.webp`,
      }));
    }

    // tierType === "series" (또는 기본값)
    return (series ?? []).map((item: Series) => ({
      name: item.koTitle,
      img: `${imgUrl}${item.id}.webp`,
    }));
  }, [tierType, contents, series, imgUrl]);

  console.log(items);

  return (
    <>
      {/* title */}
      <section className="py-10 bg-(--cream)">
        {/* title */}
        <div className="w-full max-w-7xl mx-auto px-5">
          <h2 className="heading mb-5">티어표 만들기</h2>
          <p className="paragraph text-(--grey) mt-2.5">
            시리즈, 몬스터, 무기 중 주제를 선택하고 카드를 드래그해 나만의
            순위를 완성하세요.
          </p>
        </div>
      </section>

      {/* 주제 고르기 */}
      <TierType />

      <DragDropProvider>
        {/* 티어표 */}
        <TierDisplay />
        {/* 티어 아이템 */}
        <TierList items={items} />
      </DragDropProvider>
    </>
  );
}
