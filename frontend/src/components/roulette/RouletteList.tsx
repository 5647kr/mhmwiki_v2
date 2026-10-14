import { useRouletteStore } from "../../store/rouletteStore";
import RouletteItem from "./RouletteItem";
import RouletteItemSkeleton from "./RouletteItemSkeleton";

export default function RouletteList({
  isProcessing,
  isFetching,
}: {
  isProcessing: boolean;
  isFetching: boolean;
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
          {isFetching ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <li key={index}>
                  <RouletteItemSkeleton />
                </li>
              ))}
            </>
          ) : (
            <>
              {rouletteItems.map((item, idx) => (
                <li className="w-full" key={idx}>
                  <RouletteItem
                    item={item}
                    isProcessing={isProcessing}
                    idx={idx}
                  />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
