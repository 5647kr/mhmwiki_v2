import unknownIcon from "/icons/unkown.webp";

export default function RelateSkeleton() {
  return (
    <div className="group border border-(--lgrey) translition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(46,48,40,.12)]">
      <div className="flex justify-center items-center bg-(--cream) p-5">
        <img
          src={unknownIcon}
          alt="알 수 없음"
          className="w-[50%] duration-300 group-hover:drop-shadow-[0_0_8px_#b794f4]"
        />
      </div>
      <div className="p-5 border-t border-(--lgrey)">
        <div className="mb-2.5">
          <div className="w-16.25 h-4.5 bg-(--lgrey) animate-pulse" />
        </div>
        <div className="w-20 h-5 bg-(--lgrey) animate-pulse" />
      </div>
    </div>
  );
}
