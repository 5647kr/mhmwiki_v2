import TierType from "../../components/tier/TierType";
import { useTierStore } from "../../store/tierStore";
import { useEffect, useMemo, useState } from "react";
import { useCustomQuery } from "../../hooks/useContentQuery";
import useMetaQueries from "../../hooks/useMetaQueries";
import TierFilterList from "../../components/tier/TierFilterList";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Draggable, DraggableContent } from "../../components/tier/Draggable";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import DropZone from "../../components/tier/DropZone";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

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
  const activeDraggable = useTierStore((state) => state.activeDraggable);
  const setActiveDraggable = useTierStore((state) => state.setActiveDraggable);
  const draggables = useTierStore((state) => state.draggables);
  const setDraggables = useTierStore((state) => state.setDraggables);

  const imgUrl = import.meta.env.VITE_IMG_URL;
  const tierType = useTierStore((state) => state.tierType);
  const custom = useTierStore((state) => state.custom);
  const [settingActive, setSettingActive] = useState(true);
  const { series, type } = useMetaQueries({
    enableWeak: false,
  });

  const { data: contents } = useCustomQuery({
    type: "tier",
    custom: custom,
  });

  const handleSettingActive = () => {
    setSettingActive((settingActive) => !settingActive);
  };

  const items = useMemo(() => {
    if (tierType === "monster") {
      return (contents ?? []).map((item: Content) => ({
        id: item.name,
        name: item.name,
        img: `${imgUrl}${item.img}`,
        dz: undefined,
      }));
    }

    if (tierType === "weapon") {
      return WEAPONLIST.map((weapon: string) => ({
        id: weapon,
        name: weapon,
        img: `/icons/${weapon}.webp`,
        dz: undefined,
      }));
    }

    return (series?.data ?? []).map((item: Series) => ({
      id: item.title,
      name: item.title,
      img: `${imgUrl}${item.id}.webp`,
      dz: undefined,
    }));
  }, [tierType, contents, series?.data, imgUrl]);

  useEffect(() => {
    if (items.length === 0) return;

    setDraggables(items);
  }, [tierType, items, setDraggables]);

  // 드래그 함수

  const handleDragStart = (e: DragStartEvent) => {
    const activeDraggable = draggables.find(
      (draggable) => draggable.id === e.active.id,
    );
    setActiveDraggable(activeDraggable);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over) {
      return setActiveDraggable(undefined);
    }

    const overId = e.over.id as string;
    const activeDraggableId = e.active.id as string;

    const oldIndex = draggables.findIndex(
      (draggable) => draggable.id === activeDraggableId,
    );
    const newIndex = draggables.findIndex(
      (draggable) => draggable.id === overId,
    );

    if (oldIndex === newIndex) return;

    const updateDraggables = arrayMove(draggables, oldIndex, newIndex);

    setDraggables(updateDraggables);

    setActiveDraggable(undefined);
  };

  return (
    <>
      {/* title */}
      <section className="py-10 bg-(--cream)">
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

      {/* 몬스터 선택 */}
      <div className="mt-5 w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center w-full">
          <h3 className="subTitle">몬스터 설정</h3>
          <button type="button" className="p-2.5" onClick={handleSettingActive}>
            {settingActive ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        {tierType === "monster" && settingActive && (
          <>
            <div>
              <h3 className="subParagraph mb-2.5">시리즈 선택</h3>
              <TierFilterList list={series.data} table="series" />
            </div>
            <div className="mt-5">
              <h3 className="subParagraph mb-2.5">종별 선택</h3>
              <TierFilterList list={type.data} table="type" />
            </div>
          </>
        )}
      </div>

      {/* App */}
      <div className="w-full max-w-7xl mx-auto px-5 inset-shadow-[0_0_10px_blue]">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <DropZone draggables={draggables} />

          {/* <div className="flex flex-wrap gap-2.5">
            {draggables
              .filter((draggable) => !draggable.dz)
              .map((draggable) => (
                <Draggable key={draggable.id} draggable={draggable} />
              ))}
          </div> */}

          <DragOverlay>
            {activeDraggable && (
              <DraggableContent draggable={activeDraggable} isDragging />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
