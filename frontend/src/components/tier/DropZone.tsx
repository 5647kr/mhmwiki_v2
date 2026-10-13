import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Draggable } from "./Draggable";

export default function DropZone({ draggables }: { draggables: Draggable[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: "dropZone" });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  return (
    <div
      style={style}
      className="border border-(--white) bg-(--grey) h-30 w-full flex">
      <div className="flex gap-2.5">
        <SortableContext items={draggables.map((draggable) => draggable.id)}>
          {draggables
            .filter((draggable) => draggable.dz)
            .map((draggable) => (
              <Draggable key={draggable.id} draggable={draggable} />
            ))}
        </SortableContext>
      </div>
      <div ref={setNodeRef} className="bg-(--yellow) flex-1" />
    </div>
  );
}
