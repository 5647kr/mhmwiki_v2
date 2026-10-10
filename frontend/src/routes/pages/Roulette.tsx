import { useEffect, useMemo, useState } from "react";
import RouletteDisplay from "../../components/roulette/RouletteDisplay";
import RouletteList from "../../components/roulette/RouletteList";
import { useQueryHook, useRouletteQueryHook } from "../../hook/useQueryHook";
import { randomColor } from "../../lib/randomColor";
import { useRouletteStore } from "../../store/rouletteStore";

const ITEMLIST = [
  "회복아이템 금지",
  "부적 금지",
  "복장 금지",
  "덫 금지",
  "섬광, 유인, 거름탄 금지",
  "버프아이템 금지",
  "아이루 금지",
];

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

export default function Roulette() {
  const setRouletteItems = useRouletteStore((state) => state.setRouletteItems);
  const [rouletteType, setRouletteType] = useState("monster");
  const [seriesId, setSeriesId] = useState("r");
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: series } = useQueryHook({
    table: "series",
  });
  const { data: contents } = useRouletteQueryHook({
    table: "monster",
    seriesId: seriesId,
  });

  const list: RouletteItem[] = useMemo(() => {
    const names: string[] =
      rouletteType === "monster"
        ? (contents?.map((item: Content) => item.name) ?? [])
        : rouletteType === "weapon"
          ? WEAPONLIST
          : ITEMLIST;

    return names.map((name: string) => ({
      name,
      weight: 1,
      color: randomColor(),
    }));
  }, [rouletteType, contents]);

  useEffect(() => {
    if (list && list.length > 0) {
      setRouletteItems(list);
    }
  }, [list, setRouletteItems]);

  const handleRouletteType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRouletteType(e.target.value);
  };

  const handleSeriesId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeriesId(e.target.value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5 ">
      <div className="py-10">
        <h2 className="heading mb-5">헌터 룰렛</h2>
        <p className="paragraph mt-2.5 pb-5 border-b border-(--black)">
          각 룰렛의 항목 수를 조절해 원하는 확률로 사냥 조건을 결정하세요.
        </p>
      </div>
      {/* 몬스터 & 무기 & 커스텀 */}
      <div className="flex justify-center">
        <ul className="flex gap-5">
          <li className="border border-(--lgrey)">
            <label
              className={`flex justify-center items-center p-10 cursor-pointer ${rouletteType === "monster" ? "bg-(--black) text-(--white)" : "bg-(--white) text-(--black)"}`}>
              <span className="subTitle font-bold">몬스터</span>
              <input
                type="radio"
                name="rouletteType"
                value="monster"
                className="a11y-hidden"
                disabled={isProcessing}
                onChange={handleRouletteType}
              />
            </label>
          </li>
          <li className="border border-(--lgrey)">
            <label
              className={`flex justify-center items-center p-10 cursor-pointer ${rouletteType === "weapon" ? "bg-(--black) text-(--white)" : "bg-(--white) text-(--black)"}`}>
              <span className="subTitle font-bold">무기</span>
              <input
                type="radio"
                name="rouletteType"
                value="weapon"
                className="a11y-hidden"
                disabled={isProcessing}
                onChange={handleRouletteType}
              />
            </label>
          </li>
          <li className="border border-(--lgrey)">
            <label
              className={`flex justify-center items-center p-10 cursor-pointer ${rouletteType === "custom" ? "bg-(--black) text-(--white)" : "bg-(--white) text-(--black)"}`}>
              <span className="subTitle font-bold">커스텀</span>
              <input
                type="radio"
                name="rouletteType"
                value="custom"
                className="a11y-hidden"
                disabled={isProcessing}
                onChange={handleRouletteType}
              />
            </label>
          </li>
        </ul>
      </div>

      {/* 룰렛 */}
      <div className="flex flex-col md:flex-row gap-10 py-10 mt-10">
        <RouletteDisplay
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          list={list}
        />

        <div className="flex-1">
          {rouletteType === "monster" && (
            <select onChange={handleSeriesId} value={seriesId}>
              {series?.map((item: Series) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          )}

          <RouletteList isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
}
