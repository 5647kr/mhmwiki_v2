import { ArrowRight, RotateCw } from "lucide-react";
import { Link } from "react-router";
import { useQueryHook } from "../../hook/useQueryHook";
import unknownIcon from "../../../public/icons/unkown.webp";
import { useState } from "react";

export default function RandomContent({
  totalContent,
}: {
  totalContent: number;
}) {
  const { data, isFetching, refetch } = useQueryHook({
    randomNum: totalContent,
  });
  const [isRefetching, setIsRefetching] = useState(false);
  const imgUrl = import.meta.env.VITE_IMG_URL;

  const content = data?.[0];

  const handleRefetch = () => {
    setIsRefetching(true);
    refetch();
    setTimeout(() => setIsRefetching(false), 500);
  };

  return (
    <div className="flex-1 py-5">
      {/* title */}
      <div className="pb-5 border-b border-(--grey) flex justify-between items-center">
        <span className="small text-(--yellow)">TODAY'S MONSTER</span>
        <button
          type="button"
          className="bg-(--dgrey) p-1"
          disabled={isFetching}
          onClick={handleRefetch}>
          <RotateCw
            className={`text-(--grey) ${isRefetching ? "animate-[spin_0.5s_ease-in-out]" : ""}`}
          />
        </button>
      </div>

      {/* monster img */}
      <div className="py-10 flex justify-center items-center border-b border-(--grey)">
        {content ? (
          <img
            src={content.icon !== "" ? `${imgUrl}${content.icon}` : unknownIcon}
            alt={content.name}
            className="w-[50%]"
          />
        ) : (
          <img src={unknownIcon} alt="알 수 없음" className="w-[50%]" />
        )}
      </div>

      {/* monster info */}
      <div className="py-5">
        {/* 종별 및 별명 */}
        <div>
          {content ? (
            content.nickname1 && (
              <>
                <span className="small text-(--grey)">
                  {content.nickname1.split("/")[0]} ·{" "}
                </span>
                <span className="small text-(--grey)">
                  {content.type.split("/")[0]}
                </span>
              </>
            )
          ) : (
            <div className="flex gap-1">
              <div className="w-15 h-5 bg-(--grey) animate-pulse" />
              <div className="w-15 h-5 bg-(--grey) animate-pulse" />
            </div>
          )}
        </div>
        <div className="mb-5">
          {content ? (
            <h3 className="text-(--white) subTitle">{content.name}</h3>
          ) : (
            <div className="h-7 bg-(--grey) animate-pulse my-2.5" />
          )}
        </div>
        <Link
          to={`/monster/${content?.id}`}
          className="text-(--white) bg-(--red) flex justify-between items-center py-3 px-5">
          <span className="subParagraph">상세보기</span>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
