import { Link } from "react-router";
import { useWorldCupStore } from "../../store/worldcupStore";

export default function Result() {
  const winner = useWorldCupStore((state) => state.winner);
  const handleStatus = useWorldCupStore((state) => state.handleStatus);
  const imgUrl = import.meta.env.VITE_IMG_URL;

  console.log(winner);
  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <h2 className="title">최종 우승</h2>
        <div className="w-[50%] border border-(--lgrey) bg-(--cream) flex flex-col items-center justify-between">
          {/* 이미지 */}
          <div className="py-10 flex justify-center items-center h-80 bg-(--cream)">
            <img
              src={`${imgUrl}${winner?.img}`}
              alt={winner?.name}
              loading="lazy"
              className="max-h-full object-cover"
            />
          </div>
          <div className="w-full p-5 bg-(--white)">
            <div className="text-center">
              {winner?.nickname1 && (
                <span className="small text-(--grey)">
                  {winner?.nickname1.split("/")[0]} ·{" "}
                </span>
              )}
              <span className="small text-(--grey)">
                {winner?.type.split("/")[0]}
              </span>
            </div>
            <h3 className="paragraph font-bold my-2.5 text-center">
              {winner?.name}
            </h3>
          </div>
        </div>

        <div>
          <h3 className="subTitle">
            최종 선택은 <span className="text-(--red)">{winner?.name}</span>
            입니다
          </h3>
        </div>

        <div className="flex items-center gap-5">
          <Link
            to={`/monster/${winner?.id}`}
            className="border border-(--black) py-3 px-5 small">
            {winner?.name} 알아보기
          </Link>
          <button
            type="button"
            onClick={() => handleStatus("settings")}
            className=" bg-(--black) text-(--white) py-3 px-5 flex justify-between items-center ">
            <span className="small">설정으로 돌아가기</span>
          </button>
        </div>
      </div>
    </>
  );
}
