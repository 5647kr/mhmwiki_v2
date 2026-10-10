import TierItem from "./TierItem";

// 드래그 드롭 할 아이템 목록들
export default function TierList({
  items,
}: {
  items: { img: string; name: string }[];
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          <TierItem item={item} />
        </li>
      ))}
    </ul>
  );
}
