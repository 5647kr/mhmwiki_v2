import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Draggable } from "./Draggable";

export default function FreeDropZone({
  dropZone,
  defaultDraggables,
}: {
  dropZone: DropZone;
  defaultDraggables: Draggable[];
}) {
  const { id, draggables } = dropZone;
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="border border-(--white) bg-(--cream) p-5 w-full flex">
      <div className="flex flex-wrap gap-2.5">
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
      <div ref={setNodeRef} className="flex-1" />
    </div>
  );
}
