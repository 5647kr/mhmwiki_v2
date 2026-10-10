import { useQueryHook } from "../../hook/useQueryHook";
import { useTierStore } from "../../store/tierStore";

export default function TierType() {
  const types = [
    { id: "monster", title: "몬스터" },
    { id: "weapon", title: "무기" },
    { id: "series", title: "작품" },
  ];
  const tierType = useTierStore((state) => state.tierType);
  const setTierType = useTierStore((state) => state.setTierType);
  // const contentType = useTierStore((state) => state.contentType);
  const setContentType = useTierStore((state) => state.setContentType);
  const { data: type } = useQueryHook({
    table: "type",
  });
  const { data: series } = useQueryHook({
    table: "series",
  });

  console.log(tierType);
  return (
    <section className="bg-(--white)">
      <div className="w-full max-w-7xl mx-auto p-5 flex justify-between items-center">
        {/* 카테고리 설정 */}
        <ul className="flex gap-2.5">
          {types.map((type: { id: string; title: string }) => {
            const isChecked = tierType === type.id;
            return (
              <li key={type.id}>
                <label
                  htmlFor={type.id}
                  className={`py-2 px-4 border  small cursor-pointer ${isChecked ? "bg-(--black) text-(--white) border-(--black)" : "bg-(--white) text-(--black) border-(--lgrey)"}`}>
                  {type.title}
                </label>
                <input
                  type="radio"
                  name="tierType"
                  value={type.id}
                  id={type.id}
                  checked={isChecked}
                  onChange={() => setTierType(type.id)}
                  className="a11y-hidden"
                />
              </li>
            );
          })}
        </ul>

        {tierType === "monster" && (
          <div>
            <select
              className="border-b border-(--black) py-2 px-4 small mr-2.5"
              onChange={(e) => setContentType(e.target.value)}>
              <option value="전체">시리즈</option>
              {series?.map((item: Series) => (
                <option value={item.id} id={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <select
              className="border-b border-(--black) py-2 px-4 small"
              onChange={(e) => setContentType(e.target.value)}>
              <option value="전체">종별</option>
              {type?.map((item: Type) => (
                <option value={item.title} id={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
}
