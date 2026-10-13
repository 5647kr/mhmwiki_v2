import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Draggable } from "./Draggable";

export default function DropZone({
  dropZone,
  defaultDraggables,
}: {
  dropZone: DropZone;
  defaultDraggables: Draggable[];
}) {
  const { id, draggables } = dropZone;
  const { setNodeRef } = useDroppable({ id });

  const dropZoneColorMap = {
    S: "rgba(255, 127, 127)",
    A: "rgba(255, 191, 127)",
    B: "#ffff7f",
    C: "rgba(127, 255, 127)",
  };

  const backgroundColor = dropZoneColorMap[id as keyof typeof dropZoneColorMap];

  return (
    <div className="border border-(--white) bg-(--lgrey) min-h-35 w-full flex">
      <div
        style={{ backgroundColor }}
        className="min-w-30 flex justify-center items-center title">
        {id}
      </div>
      <div className="flex flex-wrap gap-2.5 p-2.5">
        <SortableContext items={draggables}>
          {draggables.map((draggableId) => {
            const draggable = defaultDraggables?.find(
              (draggable) => draggable.id === draggableId,
            );
            if (!draggable) return null;
            return <Draggable key={draggableId} draggable={draggable} />;
          })}
        </SortableContext>
      </div>
      <div ref={setNodeRef} className="flex-1 flex flex-wrap px-5" />
    </div>
  );
}
