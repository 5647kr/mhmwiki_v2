import { useTierStore } from "../../store/tierStore";

export default function TierType() {
  const types = [
    { id: "monster", title: "몬스터" },
    { id: "weapon", title: "무기" },
    { id: "series", title: "작품" },
  ];
  const tierType = useTierStore((state) => state.tierType);
  const setTierType = useTierStore((state) => state.setTierType);
  const addDropZone = useTierStore((state) => state.addDropZone);
  const removeDropZone = useTierStore((state) => state.removeDropZone);

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

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={addDropZone}
            className="px-4 py-2 bg-(--black) text-(--white)  border border-(--black)">
            등급 추가
          </button>

          <button
            type="button"
            onClick={removeDropZone}
            className="px-4 py-2 bg-(--white) text-(--black)  border border-(--black)">
            등급 삭제
          </button>
        </div>
      </div>
    </section>
  );
}
