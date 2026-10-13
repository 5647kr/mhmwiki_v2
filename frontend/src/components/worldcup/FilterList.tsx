import { useWorldCupStore } from "../../store/worldcupStore";
import FilterItem from "./FilterItem";

export default function FilterList({
  list,
  table,
}: {
  list: Series[] | Type[];
  table: "series" | "type";
}) {
  const custom = useWorldCupStore((state) => state.custom);
  const resetCustom = useWorldCupStore((state) => state.resetCustom);

  const isAllSelected = custom[table].length === 0;
  return (
    <ul className="grid grid-cols-3 gap-5 md:flex md:flex-wrap">
      <li className="w-full md:w-30">
        <label
          className={`block border text-center w-full p-2 cursor-pointer subParagraph ${isAllSelected ? "border-(--black) bg-(--black) text-(--white)" : "border-(--grey) text-(--grey) bg-(--white) hover:border-(--black) hover:text-(--black)"}`}>
          <span className="subParagraph">전체</span>
          <input
            type="checkbox"
            className="a11y-hidden"
            value="전체"
            onChange={() => resetCustom(table)}
          />
        </label>
      </li>
      {list.map((item: Series | Type | Weak) => (
        <li key={item.id} className="w-full md:w-30">
          <FilterItem item={item} table={table} />
        </li>
      ))}
    </ul>
  );
}
