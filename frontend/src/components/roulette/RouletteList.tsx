import { X } from "lucide-react";
import { useRouletteStore } from "../../store/rouletteStore";

export default function RouletteList({
  isProcessing,
}: {
  isProcessing: boolean;
}) {
  const rouletteItems = useRouletteStore((state) => state.rouletteItems);
  const addItem = useRouletteStore((state) => state.addItem);
  const removeItem = useRouletteStore((state) => state.removeItem);
  const updateName = useRouletteStore((state) => state.updateName);
  const updateWeight = useRouletteStore((state) => state.updateWeight);

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <span className="paragraph">제약 목록</span>
        <button
          type="button"
          disabled={isProcessing}
          onClick={addItem}
          className="subParagraph cursor-pointer bg-(--black) py-2 px-5 text-(--white)">
          + 추가
        </button>
      </div>

      <div className="max-h-[calc(100vh-160px)] pr-2.5 overflow-y-auto py-2.5">
        <ul className="flex flex-col gap-5">
          {rouletteItems.map((item, idx) => (
            <li className="flex items-center gap-2.5 w-full" key={idx}>
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
                className="paragraph flex-1 bg-transparent border-b border-(--lgrey) focus:outline-0"
              />
              <input
                type="number"
                value={item.weight}
                onChange={(e) => updateWeight(idx, e.target.value)}
                disabled={isProcessing}
                className="w-10 focus:outline-0 border-0 text-center small bg-(--cream)"
              />
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => removeItem(idx)}
                className="cursor-pointer">
                <X className="w-5 lg:w-5 h-5 lg:h-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
