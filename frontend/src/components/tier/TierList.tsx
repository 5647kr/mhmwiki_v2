import { useTierStore } from "../../store/tierStore";
import TierItem from "./Draggable";

// 드래그 드롭 할 아이템 목록들
export default function TierList() {
  const tierItems = useTierStore((state) => state.tierItems);
  return (
    <div className="flex flex-wrap gap-5">
      {tierItems
        ?.filter((draggable) => !draggable.dz)
        .map((item) => (
          <TierItem item={item} />
        ))}
    </div>
  );
}
