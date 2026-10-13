import TierType from "../../components/tier/TierType";
import { useTierStore } from "../../store/tierStore";
import { useEffect, useMemo, useState } from "react";
import { useCustomQuery } from "../../hooks/useContentQuery";
import useMetaQueries from "../../hooks/useMetaQueries";
import TierFilterList from "../../components/tier/TierFilterList";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DraggableContent } from "../../components/tier/Draggable";
import {
  DndContext,
  DragOverlay,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import DropZone from "../../components/tier/DropZone";
import { arrayMove } from "@dnd-kit/sortable";
import FreeDropZone from "../../components/tier/FreeDropZone";

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

  const dropZones = useTierStore((state) => state.dropZones);
  const setDropZones = useTierStore((state) => state.setDropZones);


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

  const defaultDraggables: Draggable[] = useMemo(() => {
    if (tierType === "monster") {
      return (contents ?? []).map((item: Content) => ({
        id: item.name,
        name: item.name,
        img: `${imgUrl}${item.img}`,
        // dz: undefined,
      }));
    }

    if (tierType === "weapon") {
      return WEAPONLIST.map((weapon: string) => ({
        id: weapon,
        name: weapon,
        img: `/icons/${weapon}.webp`,
        // dz: undefined,
      }));
    }

    return (series?.data ?? []).map((item: Series) => ({
      id: item.title,
      name: item.title,
      img: `${imgUrl}${item.id}.webp`,
      // dz: undefined,
    }));
  }, [tierType, contents, series?.data, imgUrl]);

  useEffect(() => {
    if (defaultDraggables.length === 0) return;

    setDraggables(defaultDraggables);

    const defaultDropzones = [
      { id: "S", draggables: [] },
      { id: "A", draggables: [] },
      { id: "B", draggables: [] },
      { id: "C", draggables: [] },
      {
        id: "free",
        draggables: defaultDraggables.map((draggable) => draggable.id),
      },
    ];

    setDropZones(defaultDropzones);
  }, [tierType, defaultDraggables, setDraggables, setDropZones]);

  const dropZoneIds = dropZones.map((dz) => dz.id);

  // 드래그 함수

  const handleDragStart = (e: DragStartEvent) => {
    const activeDraggable = draggables.find(
      (draggable) => draggable.id === e.active.id,
    );
    setActiveDraggable(activeDraggable);
  };

  const handleDragOver = (e: DragOverEvent) => {
    if (!e.over || !activeDraggable) return;

    const overId = e.over.id as string;
    const activeDraggableId = e.active.id as string;
    const currentDropZone = dropZones.find((dz) =>
      dz.draggables.some((draggable) => draggable === activeDraggableId),
    );

    if (!currentDropZone) return;
    const currentDropZoneId = currentDropZone.id;

    // 가정1, 빈공간에 배치할 때
    if (dropZoneIds.includes(overId)) {
      const dropZone = dropZones.find((dz) => dz.id === overId)!;

      const newDraggables = [
        ...dropZone.draggables.filter(
          (draggable) => draggable !== activeDraggableId,
        ),
        activeDraggableId,
      ];

      const updateDropZones = dropZones.map((dz) => {
        if (dz.id !== overId && dz.id !== currentDropZoneId) return dz;

        if (dz.id === currentDropZoneId && currentDropZoneId !== overId)
          return {
            ...dz,
            draggables: dz.draggables.filter(
              (draggable) => draggable !== activeDraggableId,
            ),
          };

        return { ...dz, draggables: newDraggables };
      });

      setDropZones(updateDropZones);
      return;
    }

    // 가정2, 같은 행 안에서의 재정렬할 때
    else if (
      currentDropZone.draggables.some((draggable) => draggable === overId)
    ) {
      const oldIndex = currentDropZone.draggables.findIndex(
        (draggable) => draggable === activeDraggableId,
      );
      const newIndex = currentDropZone.draggables.findIndex(
        (draggable) => draggable === overId,
      );

      if (oldIndex === newIndex) return;

      const updateDraggables = arrayMove(
        currentDropZone.draggables,
        oldIndex,
        newIndex,
      );

      const updateDropZones = dropZones.map((dz) => {
        if (dz.id !== currentDropZoneId) return dz;

        return { ...dz, draggables: updateDraggables };
      });

      setDropZones(updateDropZones);
      return;
    }

    // 가정 3. 서로 다른 행에서의 재정렬
    else if (
      !currentDropZone.draggables.some((draggable) => draggable === overId)
    ) {
      const newDropZone = dropZones.find((dz) =>
        dz.draggables.some((draggable) => draggable === overId),
      );

      if (!newDropZone) return dropZones;

      const overIndex = newDropZone.draggables.findIndex(
        (draggable) => draggable === overId,
      );
      const newDraggables = newDropZone.draggables.toSpliced(
        overIndex,
        0,
        activeDraggableId,
      );

      const updateDropZones = dropZones.map((dz) => {
        if (dz.id !== currentDropZoneId && dz.id !== newDropZone.id) return dz;
        else if (dz.id === currentDropZoneId)
          return {
            ...dz,
            draggables: dz.draggables.filter(
              (draggable) => draggable !== activeDraggableId,
            ),
          };

        return { ...dz, draggables: newDraggables };
      });

      setDropZones(updateDropZones);
      return;
    }
    return dropZones;
  };

  const handleDragEnd = () => {
    setActiveDraggable(undefined);
  };

  const freeDropZone = dropZones.find((dz) => dz.id === "free");
  if (!freeDropZone) return null;

  return (
    <>
      {/* title */}
      <section className="py-10 bg-(--cream)">
        <div className="w-full max-w-7xl mx-auto px-5">
          <h2 className="heading mb-5">티어표 만들기</h2>
          <p className="paragraph text-(--grey) mt-2.5">
            몬스터, 무기, 작품 중 주제를 선택하고 카드를 드래그해 나만의
            순위를 완성하세요.
          </p>
        </div>
      </section>

      {/* 주제 고르기 */}
      <TierType />



      {/* 몬스터 선택 */}
      <div className="mt-5 w-full max-w-7xl mx-auto px-5">
        {tierType === "monster" && (
          <div className="flex justify-between items-center w-full">
            <h3 className="subTitle">몬스터 설정</h3>
            <button
              type="button"
              className="p-2.5"
              onClick={handleSettingActive}>
              {settingActive ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        )}
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

      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col gap-10 my-10">
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}>
          <div>
            {dropZones
              .filter((dz) => dz.id !== "free")
              .map((dz) => (
                <DropZone
                  key={dz.id}
                  dropZone={dz}
                  defaultDraggables={defaultDraggables}
                />
              ))}
          </div>

          <FreeDropZone
            dropZone={freeDropZone}
            defaultDraggables={defaultDraggables}
          />

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
