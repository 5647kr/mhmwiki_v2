import React from "react";

export default React.memo(function RelateItem({
  item,
}: {
  item: { id: string; icon: string; name: string };
}) {
  const imgUrl = import.meta.env.VITE_IMG_URL;
  return (
    <div className="group border border-(--lgrey) translition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(46,48,40,.12)]">
      <div className="flex justify-center items-center bg-(--cream) p-5">
        <img
          src={`${imgUrl}${item.icon}`}
          alt={item.name}
          className="w-[50%] duration-300 group-hover:drop-shadow-[0_0_8px_#b794f4]"
        />
      </div>
      <div className="p-5 border-t border-(--lgrey)">
        <h4 className="font-bold subParagraph">{item.name}</h4>
      </div>
    </div>
  );
});
