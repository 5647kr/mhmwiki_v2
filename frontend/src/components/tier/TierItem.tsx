import { useDraggable } from "@dnd-kit/react";
import { useTierStore } from "../../store/tierStore";

export default function TierItem({
  item,
}: {
  item: { img: string; name: string };
}) {
  const { ref } = useDraggable({
    id: item.name,
  });
  const tierType = useTierStore((state) => state.tierType);

  return (
    <div
      ref={ref}
      className="cursor-grab bg-(--white) flex flex-col items-center border border-(--lgrey) gap-2.5">
      <img
        src={item.img}
        alt={item.name}
        className={`${tierType === "weapon" ? "aspect-auto" : "aspect-video"} object-cover"`}
      />
      <p className="subParagraph">{item.name}</p>
    </div>
  );
}
