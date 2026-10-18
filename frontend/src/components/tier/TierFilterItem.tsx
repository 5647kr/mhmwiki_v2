import React from "react";
import { useTierStore } from "../../store/tierStore";

export default React.memo(function TierFilterItem({
  item,
  table,
}: {
  item: Series | Type;
  table: "series" | "type";
}) {
  const custom = useTierStore((state) => state.custom);
  const handleCustom = useTierStore((state) => state.handleCustom);

  const isChecked =
    table === "type"
      ? custom[table].includes(item.title)
      : custom[table].includes(item.id);
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
          handleCustom(table, table === "type" ? item.title : item.id)
        }
        checked={isChecked}
      />
    </label>
  );
});
