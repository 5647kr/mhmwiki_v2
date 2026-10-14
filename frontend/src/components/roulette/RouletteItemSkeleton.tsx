import { Minus, Plus, X } from "lucide-react";

export default function RouletteItemSkeleton() {
  return (
    <div className="flex items-center gap-2.5 w-fullx">
      {/* 색상 */}
      <div className="w-2.5 h-2.5 rounded-[50%] bg-(--lgrey) animate-pulse" />

      {/* 이름 */}
      <div className="flex-1 h-6.5 bg-(--lgrey) animate-pulse pb-1 border-b border-(--lgrey) " />

      <div className="border border-(--lgrey) flex items-center">
        <div className="text-(--grey) p-2.5 bg-(--cream)">
          <Minus />
        </div>
        <p className="small p-2.5">0</p>
        <div className="text-(--grey) p-2.5 bg-(--cream)">
          <Plus />
        </div>
      </div>
      <div className="cursor-pointer">
        <X className="w-5 lg:w-5 h-5 lg:h-6" />
      </div>
    </div>
  );
}
