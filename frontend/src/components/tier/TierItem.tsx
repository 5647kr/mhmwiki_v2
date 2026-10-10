import { useDraggable } from "@dnd-kit/react";

export default function TierItem({
  item,
}: {
  item: { img: string; name: string };
}) {
  const { ref } = useDraggable({
    id: item.name,
  });
  return (
    <div ref={ref}>
      <img src={item.img} alt={item.name} />
      <h1>{item.name}</h1>
    </div>
  );
}
