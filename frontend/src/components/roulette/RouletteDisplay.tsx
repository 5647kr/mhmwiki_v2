import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useRouletteStore } from "../../store/rouletteStore";
import toast from "react-hot-toast";

export default function RouletteDisplay({
  isProcessing,
  setIsProcessing,
  list,
}: {
  isProcessing: boolean;
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
  list: RouletteItem[];
}) {
  const rouletteItems = useRouletteStore((state) => state.rouletteItems);
  const setRouletteItems = useRouletteStore((state) => state.setRouletteItems);

  const [btnText, setBtnText] = useState("시작!");

  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isStoppingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // 컴포넌트 언마운트 시 RAF 정리
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 룰렛 그라데이션 및 라벨 위치 계산
  const { gradientStr, labels } = useMemo(() => {
    if (!rouletteItems || rouletteItems.length === 0) {
      return { gradientStr: "#374151", labels: [] };
    }

    const totalWeight = rouletteItems.reduce(
      (acc, cur) => acc + (Number(cur.weight) || 0),
      0,
    );

    // 가중치 합이 0 이하일 때 예외 처리
    if (totalWeight <= 0) {
      return { gradientStr: "#374151", labels: [] };
    }

    let currentPercent = 0;
    let currentDeg = 0;

    // 그라데이션 문자열 생성
    const gStr = rouletteItems
      .map((item) => {
        const w = Number(item.weight) || 0;
        const nextPercent = currentPercent + (w / totalWeight) * 100;
        const str = `${item.color} ${currentPercent}% ${nextPercent}%`;
        currentPercent = nextPercent;
        return str;
      })
      .join(", ");

    // 라벨 텍스트 각도 위치 생성
    const lbls = rouletteItems.map((item) => {
      const w = Number(item.weight) || 0;
      const itemDeg = (w / totalWeight) * 360;
      const rotation = currentDeg + itemDeg / 2; // 각 부채꼴의 중앙 위치
      currentDeg += itemDeg;
      return { name: item.name, rotation };
    });

    return {
      gradientStr: `conic-gradient(${gStr})`,
      labels: lbls,
    };
  }, [rouletteItems]);

  const animate = () => {
    if (!wheelRef.current) return;
    rotationRef.current += velocityRef.current;
    wheelRef.current.style.transform = `rotate(${rotationRef.current}deg)`;

    if (isStoppingRef.current) {
      velocityRef.current *= 0.99; // 감속
      if (velocityRef.current < 0.1) {
        velocityRef.current = 0;
        isStoppingRef.current = false;
        setIsProcessing(false);
        setBtnText("시작!");
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        calculateWinner(rotationRef.current);
        return;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  };

  const handleAction = () => {
    if (rouletteItems.length < 2) {
      toast.error("최소 2개 이상의 항목이 필요합니다.");
      return;
    }

    if (isProcessing && btnText === "정지!") {
      setBtnText("멈추는 중...");
      setTimeout(() => {
        isStoppingRef.current = true;
      }, 1000);
      return;
    }

    if (!isProcessing) {
      setIsProcessing(true);
      setBtnText("정지!");
      isStoppingRef.current = false;
      velocityRef.current = 25; //가속
      animate();
    }
  };

  const calculateWinner = (finalRotationDeg: number) => {
    const totalWeight = rouletteItems.reduce(
      (acc, cur) => acc + (Number(cur.weight) || 0),
      0,
    );

    if (totalWeight <= 0) return;

    // 12시 방향(상단 화살표) 기준 바늘 각도 계산
    const normalizedDeg = ((finalRotationDeg % 360) + 360) % 360;
    const needleDeg = (360 - normalizedDeg) % 360;

    let cumulativeDeg = 0;
    let winner = "";

    // items -> rouletteItems 로 수정
    for (const item of rouletteItems) {
      const itemWeight = Number(item.weight) || 0;
      const itemDeg = (itemWeight / totalWeight) * 360;

      if (needleDeg >= cumulativeDeg && needleDeg < cumulativeDeg + itemDeg) {
        winner = item.name;
        break;
      }
      cumulativeDeg += itemDeg;
    }

    toast.success(`🎯 당첨: ${winner || "없음"}`);
  };

  // 초기화 버튼 동작 (예시)
  const handleReset = () => {
    setRouletteItems(list);
    if (isProcessing) return;
    rotationRef.current = 0;
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(0deg)`;
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-5">
      <div className="relative flex items-center justify-center w-full p-10 aspect-square">
        <div className="absolute top-5 z-30 text-[#E63946] text-[30px]">▼</div>

        {/* 룰렛 검은 테두리 배경 */}
        <div className="w-full aspect-square rounded-[50%] border-10 border-[#1F2937] overflow-hidden relative box-border">
          <div
            className="w-full h-full rounded-[50%]"
            ref={wheelRef}
            style={{
              background: gradientStr,
            }}>
            {labels.map((label, index) => (
              <div
                key={`${label.name}-${index}`}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `rotate(${label.rotation}deg)`,
                }}>
                <div className="absolute top-6 left-[50%] transform translate-x-[-50%] w-17.5 text-center pointer-events-none">
                  <span className="subParagraph break-keep drop-shadow-sm">
                    {label.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 룰렛 중앙 원형 핀 */}
          <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-3.5 h-3.5 bg-(--black) border-2 border-(--yellow) rounded-[50%] z-25" />
        </div>
      </div>

      {/* 룰렛 버튼 그룹 */}
      <div className="flex gap-2.5 justify-center">
        <button
          onClick={handleAction}
          disabled={btnText === "멈추는 중..."}
          className="w-full py-2.5 subParagraph cursor-pointer bg-(--black) text-white disabled:bg-(--grey)">
          {btnText}
        </button>

        <button
          onClick={handleReset}
          disabled={isProcessing}
          className="w-full py-2.5 subParagraph cursor-pointer bg-(--white) border border-(--red) text-(--red) disabled:opacity-50">
          초기화
        </button>
      </div>
    </div>
  );
}
