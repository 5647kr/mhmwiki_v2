// import { useDraggable } from "@dnd-kit/core";
import { useTierStore } from "../../store/tierStore";
import { useSortable } from "@dnd-kit/sortable";

export function Draggable({ draggable }: { draggable: Draggable }) {
  const { id } = draggable;
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id });
  const tierType = useTierStore((state) => state.tierType);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <button
      className={`group flex justify-center items-center gap-2.5 w-30 ${
        tierType === "series" ? "aspect-video" : "aspect-square"
      }`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <DraggableContent draggable={draggable} />
    </button>
  );
}

export function DraggableContent({
  draggable,
  isDragging,
}: {
  draggable: Draggable;
  isDragging?: boolean;
}) {
  const { id, img, name } = draggable;

  const tierType = useTierStore((state) => state.tierType);
  const activeDraggableId = useTierStore((state) => state.activeDraggable)?.id;

  return (
    <div className="relative">
      <img
        src={img}
        alt={name}
        style={{ opacity: isDragging || activeDraggableId !== id ? 1 : 0.5 }}
        className={`w-full ${
          tierType === "series" ? "aspect-video" : "aspect-square"
        }`}
      />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10 flex items-end justify-center pb-2.5">
        <p className="text-(--white) small break-keep">{draggable.name}</p>
      </div>
    </div>
  );
}
