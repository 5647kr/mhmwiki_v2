import unknownIcon from "../../../public/icons/unkown.webp";
import React from "react";

export default React.memo(function ContentItem({
  content,
}: {
  content: Content;
}) {
  const imgUrl = import.meta.env.VITE_IMG_URL;
  return (
    <div className="group border border-(--lgrey) translition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(46,48,40,.12)]">
      {/* imgWrap */}
      <div className="bg-(--cream) p-5 flex justify-center items-center">
        <img
          src={content.icon !== "" ? `${imgUrl}${content.icon}` : unknownIcon}
          alt={`${content.name}`}
          className="w-full aspect-square duration-300 group-hover:drop-shadow-[0_0_8px_#b794f4]"
        />
      </div>
      {/* infoWrap */}
      <div className="bg-(--white) px-2.5 py-5">
        <div>
          {content.nickname1 && (
            <span className="small text-(--grey)">
              {content.nickname1.split("/")[0]} ·{" "}
            </span>
          )}
          <span className="small text-(--grey)">
            {content.type.split("/")[0]}
          </span>
        </div>
        <h5 className="paragraph font-bold my-2.5">{content.name}</h5>
        <div className="flex justify-between items-center pt-5 border-t border-(--lgrey)">
          <p className="small text-(--grey)">약점</p>
          {content.weakEl.length > 0 ? (
            <ul className="flex gap-1">
              {content.weakEl.map((weak, index: number) => (
                <li key={index} className="small text-(--grey)">
                  {weak}속성
                </li>
              ))}
            </ul>
          ) : (
            <span className="small text-(--grey)">알 수 없음</span>
          )}
        </div>
      </div>
    </div>
  );
});
