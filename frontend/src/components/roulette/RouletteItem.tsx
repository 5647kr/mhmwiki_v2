import { useMemo } from "react";
import { useRouletteStore } from "../../store/rouletteStore";
import { Minus, Plus, X } from "lucide-react";

export default function RouletteItem({
  item,
  isProcessing,
  idx,
}: {
  item: RouletteItem;
  isProcessing: boolean;
  idx: number;
}) {
  const rouletteItems = useRouletteStore((state) => state.rouletteItems);
  const updateName = useRouletteStore((state) => state.updateName);
  const removeItem = useRouletteStore((state) => state.removeItem);
  const increaseWeight = useRouletteStore((state) => state.increaseWeight);
  const decreaseWeight = useRouletteStore((state) => state.decreaseWeight);
  const updateWeight = useRouletteStore((state) => state.updateWeight);

  const totalWeight = useMemo(() => {
    return rouletteItems.reduce((acc, cur) => acc + cur.weight, 0);
  }, [rouletteItems]);

  const percentage = useMemo(() => {
    if (totalWeight === 0) return "0.0";
    return ((item.weight / totalWeight) * 100).toFixed(1);
  }, [item.weight, totalWeight]);

  return (
    <div className="flex items-center gap-2.5 w-fullx">
      <div
        className="w-2.5 h-2.5 rounded-[50%]"
        style={{
          backgroundColor: item.color,
        }}
      />
      <input
        type="text"
        value={item.name}
        onChange={(e) => updateName(idx, e.target.value)}
        disabled={isProcessing}
        className="paragraph flex-1 bg-transparent border-b border-(--lgrey) focus:outline-0"
      />
      <span className="text-(--grey) small">{percentage}%</span>
      <div className="border border-(--lgrey) flex items-center">
        <button
          type="button"
          className="text-(--grey) p-2.5 bg-(--cream)"
          disabled={item.weight <= 1}
          onClick={() => decreaseWeight(idx)}>
          <Minus />
        </button>
        <input
          type="text"
          value={item.weight}
          onChange={(e) => updateWeight(idx, e.target.value)}
          disabled={isProcessing}
          max={999}
          className="p-2.5 focus:outline-0 border-0 text-center small w-12"
        />
        <button
          type="button"
          className="text-(--grey) p-2.5 bg-(--cream)"
          onClick={() => increaseWeight(idx)}>
          <Plus />
        </button>
      </div>
      <button
        type="button"
        disabled={isProcessing}
        onClick={() => removeItem(idx)}
        className="cursor-pointer">
        <X className="w-5 lg:w-5 h-5 lg:h-6" />
      </button>
    </div>
  );
}
