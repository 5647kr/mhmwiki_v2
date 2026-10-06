import unknownIcon from "../../../public/icons/unkown.webp";

export function ContentSkeleton() {
  return (
    <div className="border border-(--lgrey)">
      {/* imgWrap */}
      <div className="bg-(--cream) p-5 flex justify-center items-center">
        <img
          src={unknownIcon}
          alt="알 수 없음"
          className="w-full aspect-square"
        />
      </div>
      {/* infoWrap */}
      <div className="bg-(--white) px-2.5 py-5">
        <div>
          <span className="w-15 h-5 bg-(--lgrey) animate-pulse" />
          <span className="w-15 h-5 bg-(--lgrey) animate-pulse" />
        </div>
        <div className="h-7 bg-(--lgrey) animate-pulse my-2.5" />
        <div className="flex justify-between items-center pt-5 border-t border-(--lgrey)">
          <div className="w-15 h-5 bg-(--lgrey) animate-pulse" />
          <div className="flex gap-1">
            <div className="w-15 h-5 bg-(--lgrey) animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentSkeletonList() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {Array.from({ length: 20 }).map((_, index) => (
        <li key={index}>
          <ContentSkeleton />
        </li>
      ))}
    </ul>
  );
}
