import React from "react";
import { useFilterStore } from "../../store/filterStore";

export default React.memo(function FilterItem({
  item,
  table,
}: {
  item: Series | Type | Weak;
  table: "series" | "type" | "weak";
}) {
  const filterState = useFilterStore((state) => state.filterState);
  const setFilterState = useFilterStore((state) => state.setFilterState);

  const isChecked =
    table === "type"
      ? filterState[table].includes(item.title)
      : filterState[table].includes(item.id);

  console.log(item);
  return (
    <label className="block border border-(--grey) text-(--grey) text-center hover:border-(--black) hover:text-(--black) w-full bg-(--white) cursor-pointer has-checked:border-(--black) has-checked:bg-(--black) has-checked:text-(--white)">
      <span className="subParagraph block p-2">
        {table === "series" ? (
          <abbr className="block no-underline" title={(item as Series).koTitle}>
            {item.title}
          </abbr>
        ) : (
          item.title
        )}
      </span>
      <input
        type="checkbox"
        className="a11y-hidden"
        value={table === "type" ? item.title : item.id}
        onChange={() =>
          setFilterState(table, table === "type" ? item.title : item.id)
        }
        checked={isChecked}
      />
    </label>
  );
});
