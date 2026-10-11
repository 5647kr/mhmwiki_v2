import useMetaQueries from "../../hooks/useMetaQueries";

export default function RouletteType({
  rouletteType,
  handleRouletteType,
  seriesId,
  handleSeriesId,
  isProcessing,
}: {
  rouletteType: string;
  handleRouletteType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  seriesId: string;
  handleSeriesId: (e: React.ChangeEvent<HTMLSelectElement, Element>) => void;
  isProcessing: boolean;
}) {
  const types = [
    { id: "monster", title: "몬스터" },
    { id: "weapon", title: "무기" },
    { id: "custom", title: "커스텀" },
  ];
  const { series } = useMetaQueries({
    enableType: false,
    enableWeak: false,
  });

  return (
    <section className="bg-(--white)">
      <div className="w-full max-w-7xl mx-auto p-5 flex justify-between items-center">
        {/* 카테고리 설정 */}
        <ul className="flex gap-2.5">
          {types.map((type: { id: string; title: string }) => {
            const isChecked = rouletteType === type.id;
            return (
              <li key={type.id}>
                <label
                  htmlFor={type.id}
                  className={`py-2 px-4 border  small cursor-pointer ${isChecked ? "bg-(--black) text-(--white) border-(--black)" : "bg-(--white) text-(--black) border-(--lgrey)"}`}>
                  {type.title}
                </label>
                <input
                  type="radio"
                  name="rouletteType"
                  value={type.id}
                  id={type.id}
                  checked={isChecked}
                  onChange={handleRouletteType}
                  className="a11y-hidden"
                  disabled={isProcessing}
                />
              </li>
            );
          })}
        </ul>

        {rouletteType === "monster" && (
          <div>
            <select
              className="border-b border-(--black) py-2 px-4 small mr-2.5 cursor-pointer"
              onChange={handleSeriesId}
              value={seriesId}
              disabled={isProcessing}>
              <option value="전체">시리즈</option>
              {series?.data?.map((item: Series) => (
                <option value={item.id} id={item.id} key={item.id}>
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
