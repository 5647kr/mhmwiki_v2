import React from "react";

export default React.memo(function HistoryItem({
  content,
  index,
}: {
  content: Series;
  index: number;
}) {
  const imgUrl = import.meta.env.VITE_IMG_URL;
  console.log(content);
  return (
    <div className="flex gap-5">
      {/* nav */}
      <div
        className="flex-1 border-r border-(--lgrey) relative

      before:absolute before:w-5 before:h-5 before:content-[''] before:block before:border-2 before:border-(--red) before:right-0 before:translate-x-1/2 before:bg-(--white) 
      
      after:absolute after:w-3 after:h-3 after:content-[''] after:block after:border-2 after:border-(--red) after:right-0 after:top-0 after:translate-x-1/2 after:translate-y-1  after:bg-(--red) 
      ">
        <div className="pr-5">
          <strong className="paragraph text-end block">
            {content.open.split("-")[0]}
          </strong>
          <span className="text-(--grey) small block text-end">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex-5 md:flex-10 flex flex-col md:flex-row gap-5">
        {/* img */}
        <div className="md:flex-1">
          <img
            src={`${imgUrl}${content.id}.webp`}
            alt={content.fullName}
            className="h-full w-full object-cover items-top"
          />
        </div>
        {/* content */}
        <div className="md:py-5 md:flex-2 border-b border-(--lgrey) md:border-b-0 md:border-t">
          <span className="small text-(--red)">{content.title}</span>
          <div className="mt-2.5 mb-5">
            <h4 className="subTitle">{content.koTitle}</h4>
            <h5 className="paragraph text-(--grey)">{content.fullName}</h5>
          </div>
          <div>
            <ul>
              <li className="py-2.5 border-t border-(--lgrey) flex items-center">
                <span className="small text-(--grey) inline-block w-25">
                  출시일
                </span>
                <p className="subParagraph">{content.open}</p>
              </li>
              <li className="py-2.5 border-t border-(--lgrey) flex items-center">
                <span className="small text-(--grey) inline-block w-25">
                  출시 플랫폼
                </span>
                <p className="subParagraph">{content.platform}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});
