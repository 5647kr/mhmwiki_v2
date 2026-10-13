import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { atom, useAtom, useAtomValue } from "jotai";

type Draggable = {
  id: string;
  src: string;
  dz?: string;
};

type DropZone = {
  id: string;
  draggables: string[];
};

const defaultDraggables: Draggable[] = [
  { id: crypto.randomUUID(), src: "GolemCard.png" },
  { id: crypto.randomUUID(), src: "MegaKnight.png" },
  { id: crypto.randomUUID(), src: "BabyDragonCard.png" },
  { id: crypto.randomUUID(), src: "BarbariansCard.png" },
  { id: crypto.randomUUID(), src: "BomberCard.png" },
  { id: crypto.randomUUID(), src: "DarkPrinceCard.png" },
  { id: crypto.randomUUID(), src: "ElixirGolemCard.png" },
  { id: crypto.randomUUID(), src: "MinerCard.png" },
  { id: crypto.randomUUID(), src: "PEKKACard.png" },
  { id: crypto.randomUUID(), src: "RagingPrinceCard.png" },
  { id: crypto.randomUUID(), src: "SkeletonsCard.png" },
];

const defaultDropZones: DropZone[] = [
  { id: "S", draggables: [] },
  { id: "A", draggables: [] },
  { id: "B", draggables: [] },
  { id: "C", draggables: [] },
  { id: "D", draggables: [] },
  {
    id: "free",
    draggables: defaultDraggables.map((draggable) => draggable.id),
  },
];

const dropZoneIds = defaultDropZones.map((dz) => dz.id);

const activeDraggableAtom = atom<Draggable>();

export default function TierTest() {
  const [draggables, setDraggables] = useState<Draggable[]>(defaultDraggables);
  const [dropZones, setDropZones] = useState<DropZone[]>(defaultDropZones);
  const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);

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

    setDropZones((prev) => {
      // Case #1: If we're hovering the empty space in a DropZone
      if (dropZoneIds.includes(overId)) {
        const dropZone = prev.find((dz) => dz.id === overId)!;
        const newDraggables = [
          ...dropZone.draggables.filter(
            (draggable) => draggable !== activeDraggableId,
          ),
          activeDraggableId,
        ];
        return prev.map((dz) => {
          // If not the old OR new, just return
          if (dz.id !== overId && dz.id !== currentDropZoneId) return dz;

          // Remove from the old one IF we went across zones
          if (dz.id === currentDropZoneId && currentDropZoneId !== overId)
            return {
              ...dz,
              draggables: dz.draggables.filter(
                (draggable) => draggable !== activeDraggableId,
              ),
            };

          // Add to new one
          return { ...dz, draggables: newDraggables };
        });
      }

      // Case #2 Re-arranging items in the same row
      else if (
        currentDropZone.draggables.some((draggable) => draggable === overId)
      ) {
        const oldIndex = currentDropZone.draggables.findIndex(
          (draggable) => draggable === activeDraggableId,
        );
        const newIndex = currentDropZone.draggables.findIndex(
          (draggable) => draggable === overId,
        );

        if (oldIndex === newIndex) return prev;

        const newDraggables = arrayMove(
          currentDropZone.draggables,
          oldIndex,
          newIndex,
        );

        return prev.map((dz) => {
          if (dz.id !== currentDropZoneId) return dz;
          return { ...dz, draggables: newDraggables };
        });
      }

      // Case 3: If we're re-arranging between TWO different rows
      else if (
        !currentDropZone.draggables.some((draggable) => draggable === overId)
      ) {
        const newDropZone = dropZones.find((dz) =>
          dz.draggables.some((draggable) => draggable === overId),
        );
        if (!newDropZone) return prev;
        const overIndex = newDropZone.draggables.findIndex(
          (draggable) => draggable === overId,
        );
        const newDraggables = newDropZone.draggables.toSpliced(
          overIndex,
          0,
          activeDraggableId,
        );
        return prev.map((dz) => {
          // If not the new OR old dropZone, just return it as is
          if (dz.id !== currentDropZoneId && dz.id !== newDropZone.id)
            return dz;
          // Remove from the old one
          else if (dz.id === currentDropZoneId)
            return {
              ...dz,
              draggables: dz.draggables.filter(
                (draggable) => draggable !== activeDraggableId,
              ),
            };

          // Add to new
          return { ...dz, draggables: newDraggables };
        });
      }

      return prev;
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveDraggable(undefined);
  };

  const freeDropZone = dropZones.find((dz) => dz.id === "free");
  if (!freeDropZone) return null;

  return (
    <div className="w-[60%] mx-auto h-screen flex flex-col gap-16 justify-center items-center">
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className="w-full">
          {dropZones
            .filter((dz) => dz.id !== "free")
            .map((dz) => (
              <DropZone dropZone={dz} />
            ))}
        </div>
        <FreeDropZone dropZone={freeDropZone} />
        <DragOverlay>
          {activeDraggable && (
            <DraggableContent draggable={activeDraggable} isDragging />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function DropZone({ dropZone }: { dropZone: DropZone }) {
  const { id, draggables } = dropZone;
  const { setNodeRef } = useDroppable({ id });

  const backgroundColor = dropZoneColorMap[id as keyof typeof dropZoneColorMap];

  return (
    <div className="border border-white bg-[#333] h-30 w-full flex">
      <div
        className="w-30 flex justify-center items-center text-4xl font-semibold text-black"
        style={{ backgroundColor }}>
        {id}
      </div>
      <div className="flex gap-4">
        <SortableContext items={draggables}>
          {draggables.map((draggableId) => {
            const draggable = defaultDraggables.find(
              (draggable) => draggable.id === draggableId,
            );
            if (!draggable) return null;
            return <Draggable key={draggableId} draggable={draggable} />;
          })}
        </SortableContext>
      </div>
      <div ref={setNodeRef} className="flex-1" />
    </div>
  );
}

function FreeDropZone({ dropZone }: { dropZone: DropZone }) {
  const { id, draggables } = dropZone;
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="border-2 rounded-lg border-[#333] h-30 w-full flex">
      <div className="flex gap-4">
        <SortableContext items={draggables}>
          {draggables.map((draggableId) => {
            const draggable = defaultDraggables.find(
              (draggable) => draggable.id === draggableId,
            );
            if (!draggable) return null;
            return <Draggable key={draggableId} draggable={draggable} />;
          })}
        </SortableContext>
      </div>
      <div ref={setNodeRef} className="flex-1" />
    </div>
  );
}

function Draggable({ draggable }: { draggable: Draggable }) {
  const { id } = draggable;
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <button
      className="cursor-pointer"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <DraggableContent draggable={draggable} />
    </button>
  );
}

function DraggableContent({
  draggable,
  isDragging,
}: {
  draggable: Draggable;
  isDragging?: boolean;
}) {
  const { id, src } = draggable;
  const activeDraggableId = useAtomValue(activeDraggableAtom)?.id;
  return (
    <img
      src={`/src/assets/${src}`}
      style={{ opacity: isDragging || activeDraggableId !== id ? 1 : 0 }}
      className="max-h-30 aspect-[0.833] object-cover"
    />
  );
}

const dropZoneColorMap = {
  S: "rgb(255, 127, 127)",
  A: "rgb(255, 191, 127)",
  B: "#FFFF7F",
  C: "rgb(191, 255, 127)",
  D: "rgb(127, 255, 127)",
};
