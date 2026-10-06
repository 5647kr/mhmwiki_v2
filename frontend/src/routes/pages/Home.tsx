import Search from "../../components/home/Search";
import Filter from "../../components/home/Filter";
import useInfiniteQueryHook from "../../hook/useInfiniteQueryHook";
import { useFilterStore } from "../../store/filterStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ContentSkeletonList } from "../../components/common/ContentSkeleton";
import toast from "react-hot-toast";
import RandomContent from "../../components/home/RandomContent";
import ContentList from "../../components/common/ContentList";

export default function Home() {
  const filterState = useFilterStore((state) => state.filterState);
  const resetFilterState = useFilterStore((state) => state.resetFilterState);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQueryHook(filterState);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const contents: Content[] =
    data?.pages.flatMap((page) => page?.data || []) || [];
  const contentLength = data?.pages.flatMap((page) => page?.totalCount);
  const totalContent = contentLength?.[0];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (status === "success" && contents.length === 0) {
      toast.error("검색 결과가 없습니다. 다시 검색해주세요.");

      setTimeout(() => {
        resetFilterState("series");
        resetFilterState("type");
        resetFilterState("weak");
      }, 1000);
    }
  }, [
    status,
    contents.length,
    filterState.series,
    filterState.type,
    filterState.weak,
    resetFilterState,
  ]);

  return (
    <>
      {/* hero section */}
      <section className="bg-(--black)">
        <div className="w-full max-w-7xl mx-auto px-5 flex flex-col md:flex-row gap-5 md:gap-20">
          {/* hero */}
          <div className="flex-1 py-5">
            {/* title */}
            <div>
              <span className="small text-(--yellow)">
                2024 - 2027 ALL SERIES
              </span>
              <h2 className="text-[80px] font-black text-(--white) leading-15 my-6">
                <span className="text-(--red)">MON</span>
                <br />
                STER <br />
                <span className="text-(--grey)">WIKI</span>
              </h2>
              <p className="text-(--grey) subParagraph break-keep">
                초대 몬스터 헌터부터 와일즈까지 역대 시리즈에 등장한 모든 대형
                몬스터의 데이터베이스
              </p>
            </div>
            {/* search */}
            <div className="my-6">
              <Search />
            </div>
            {/* tags */}
            <div className="border border-(--grey)">
              <ul className="flex">
                <li className="py-5 px-2.5 flex-1">
                  <strong className="subTitle text-(--white)">249</strong>
                  <p className="text-(--grey) small">MONSTER</p>
                </li>
                <li className="py-5 px-2.5 flex-1 border-l border-(--grey)">
                  <strong className="subTitle text-(--white)">19</strong>
                  <p className="text-(--grey) small">TITLES</p>
                </li>
                <li className="py-5 px-2.5 flex-1 border-l border-(--grey)">
                  <strong className="subTitle text-(--white)">
                    {2027 - 2004}
                    <span className="subParagraph text-(--red)">YR</span>
                  </strong>
                  <p className="text-(--grey) small">HISTORY</p>
                </li>
                <li className="py-5 px-2.5 flex-1 border-l border-(--grey)">
                  <strong className="subTitle text-(--white)">16</strong>
                  <p className="text-(--grey) small">TYPE</p>
                </li>
              </ul>
            </div>
          </div>
          {/* today monster */}
          <RandomContent totalContent={totalContent!} />
        </div>
      </section>

      {/* filter section */}
      <section className="bg-(--cream)">
        <div className="w-full max-w-7xl mx-auto p-5">
          <Filter />
        </div>
      </section>

      {/* content section */}
      <section className="w-full max-w-7xl mx-auto p-5">
        <div>
          <div className="flex items-end gap-2.5 mt-5 mb-10">
            <h4 className="subTitle">대형 몬스터</h4>
            <span className="small text-(--grey)">
              검색 결과: {status === "pending" ? 0 : contentLength?.[0]}종
            </span>
          </div>

          {status === "pending" && <ContentSkeletonList />}

          {status === "success" && contents.length > 0 && (
            <ContentList contents={contents} ref={ref} />
          )}
        </div>
      </section>
    </>
  );
}
