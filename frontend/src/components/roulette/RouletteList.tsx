import { useRouletteStore } from "../../store/rouletteStore";
import RouletteItem from "./RouletteItem";

export default function RouletteList({
  isProcessing,
}: {
  isProcessing: boolean;
}) {
  const rouletteItems = useRouletteStore((state) => state.rouletteItems);
  const addItem = useRouletteStore((state) => state.addItem);

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

      <div>
        <ul className="flex flex-col gap-5">
          {rouletteItems.map((item, idx) => (
            <li className="w-full" key={idx}>
              <RouletteItem item={item} isProcessing={isProcessing} idx={idx} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
