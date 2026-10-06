import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useQueriesHook } from "../../hook/useQueryHook";
import { useFilterStore } from "../../store/filterStore";
import FilterList from "./FilterList";

export default function Filter() {
  const filterState = useFilterStore((state) => state.filterState);
  const [filterActive, setFilterActive] = useState(true);
  const [activeTab, setActiveTab] = useState("series");

  const handleFilterActive = () => {
    setFilterActive((filterActive) => !filterActive);
  };

  const { series, type, weak } = useQueriesHook();

  return (
    <>
      <button
        type="button"
        className="w-full flex justify-between items-center py-3"
        onClick={handleFilterActive}>
        <span className="subParagraph font-bold">FILTER</span>
        {filterActive ? <ChevronUp /> : <ChevronDown />}
      </button>

      {filterActive && (
        <div
          className="grid border border-(--lgrey)
        
        grid-cols-[1fr_1fr_1fr]
        [grid-template-areas:'series-title_type-title_weak-title'_'body_body_body']

        md:grid-cols-[1fr_4fr]
        md:[grid-template-areas:'series-title_series-body'_'type-title_type-body'_'weak-title_weak-body']">
          {/* series */}
          {/* Title */}
          <div
            onClick={() => setActiveTab("series")}
            className={`p-5 cursor-pointer md:cursor-auto [grid-area:series-title] md:border-r md:border-(--lgrey) ${
              activeTab === "series"
                ? "bg-(--black) text-(--white) md:bg-(--cream) md:text-(--black)"
                : ""
            }`}>
            <h4 className="subTitle">시리즈</h4>
            <span className="small">{filterState.series.length}개 선택</span>
          </div>

          <div
            className={`p-5 border-t border-(--lgrey) md:border-t-0 ${
              activeTab === "series" ? "[grid-area:body]" : "hidden"
            } md:block md:[grid-area:series-body]`}>
            {!series.isPending && series.data.length > 0 && (
              <FilterList list={series.data} table="series" />
            )}
          </div>

          {/* type */}
          {/* Title */}
          <div
            onClick={() => setActiveTab("type")}
            className={`p-5 cursor-pointer md:cursor-auto border-x border-(--lgrey) md:border-r md:border-l-0 md:border-y [grid-area:type-title] ${
              activeTab === "type"
                ? "bg-(--black) text-(--white) md:bg-(--cream) md:text-(--black)"
                : ""
            }`}>
            <h4 className="subTitle">종별</h4>
            <span className="small">{filterState.type.length}개 선택</span>
          </div>

          {/* Body */}
          <div
            className={`p-5 border-t md:border-y border-(--lgrey) ${
              activeTab === "type" ? "[grid-area:body]" : "hidden"
            } md:block md:[grid-area:type-body]`}>
            {!type.isPending && type.data.length > 0 && (
              <FilterList list={type.data} table="type" />
            )}
          </div>

          {/* weak */}
          {/* Title */}
          <div
            onClick={() => setActiveTab("weak")}
            className={`p-5 cursor-pointer md:cursor-auto [grid-area:weak-title] md:border-r md:border-(--lgrey) ${
              activeTab === "weak"
                ? "font-bold bg-(--black) text-(--white) md:bg-(--cream) md:text-(--black)"
                : ""
            }`}>
            <h4 className="subTitle">약점</h4>
            <span className="small">{filterState.weak.length}개 선택</span>
          </div>

          {/* Body */}
          <div
            className={`p-5 border-t border-(--lgrey) md:border-t-0 ${
              activeTab === "weak" ? "[grid-area:body]" : "hidden"
            } md:block md:[grid-area:weak-body]`}>
            {!weak.isPending && weak.data.length > 0 && (
              <FilterList list={weak.data} table="weak" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
