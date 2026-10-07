import { useParams } from "react-router";
import { useQueryHook, useOneQueryHook } from "../../hook/useQueryHook";
import { useMemo, useState } from "react";
import RelateList from "../../components/detail/RelateList";
import PageSkeleton from "../../components/detail/PageSkeleton";

export default function Detail() {
  const imgurl = import.meta.env.VITE_IMG_URL;
  const { id } = useParams();
  const { data: series } = useQueryHook({ table: "series" });
  const { data: content, isFetching } = useOneQueryHook({
    id: id,
  });
  const [prevId, setPrevId] = useState("");
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  if (prevId !== id) {
    setPrevId(id!);
    setIsImgLoaded(false);
  }

  const firstSeries = useMemo(() => {
    if (series && content) {
      return series.find((item: Series) => item.id === content.allSeriesIds[0]);
    }
  }, [series, content]);

  if (isFetching || !content) return <PageSkeleton />;

  return (
    <>
      {!isImgLoaded && <PageSkeleton />}
      {/* hero */}
      <section className="bg-(--cream)">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* img */}
          <div className="flex-2 p-5 flex justify-center items-center ">
            <img
              onLoad={() => setIsImgLoaded(true)}
              src={`${imgurl}${content.img}`}
              alt={content.name}
              className="w-[65%] object-cover "
            />
          </div>
          {/* 기본 정보 */}
          <div className="flex-1 p-5 flex flex-col justify-center gap-2.5">
            <div>
              <span className="text-(--red) small">
                {content.type.split("/")[0]}
              </span>
              {content.type.split("/")[1] && (
                <span className="text-(--red) small">
                  / {content.type.split("/")[1]}
                </span>
              )}
            </div>
            <h2 className="heading mb-2.5">{content.name}</h2>
            {content.nickname1 && (
              <div>
                <div>
                  <p className="subTitle text-(--grey)">
                    {content.nickname1.split("/")[0]}
                  </p>
                  <span className="small text-(--grey)">
                    {content.nickname1.split("/")[1]}
                  </span>
                </div>

                {content.nickname2 && (
                  <div>
                    <p className="subTitle text-(--grey)">
                      {content.nickname2.split("/")[0]}
                    </p>
                    <span className="small text-(--grey)">
                      {content.nickname2.split("/")[1]}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 정보 레이아웃 */}
      <div className="relative w-full max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* 사이드 정보: side */}
        <div className="md:col-satrt-4 md:col-sapn-1 md:row-start-1 md:sticky md:top-5 flex flex-col gap-5">
          {/* 개체 정보 */}
          <section className="bg-(--cream) border border-t-2 border-t-(--black) border-(--lgrey) p-5">
            <div className="pb-5">
              <h3 className="paragraph font-bold">개체 정보</h3>
            </div>
            <ul>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">이름</span>
                <p className="subParagraph font-medium">{content.name}</p>
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">종별</span>
                <div className="flex flex-col items-end">
                  <p className="subParagraph font-medium">
                    {content.type.split("/")[0]}
                  </p>
                </div>
              </li>
              {content.nickname1 && (
                <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                  <span className="small text-(--grey)">별칭</span>
                  <div className="flex flex-col items-end">
                    <p className="subParagraph font-medium">
                      {content.nickname1.split("/")[0]}
                    </p>
                    {content.nickname2 && (
                      <p className="subParagraph font-medium">
                        {content.nickname2.split("/")[0]}
                      </p>
                    )}
                  </div>
                </li>
              )}
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">종</span>
                <p className="subParagraph font-medium">{content.species}</p>
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">첫 등장 작품</span>
                <p className="subParagraph font-medium">{firstSeries?.title}</p>
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">참여 작품 수</span>
                <p className="subParagraph font-medium">
                  {content.allSeriesIds.length}
                  <span className="small text-(--grey)">작품</span>
                </p>
              </li>
            </ul>
          </section>

          {/* 속성 정보 */}
          {(content.weakEl.length > 0 ||
            content.element.length > 0 ||
            content.ailment.length > 0) && (
            <section className="bg-(--cream) border border-t-2 border-t-(--black) border-(--lgrey) p-5 mt-5">
              <div className="pb-5">
                <h3 className="paragraph font-bold">속성 정보</h3>
              </div>
              <ul>
                {content.weakEl.length > 0 && (
                  <li className="border-t border-(--lgrey) py-2.5 flex items-center gap-2.5">
                    <span className="small text-(--grey) min-w-20">
                      약점 속성
                    </span>
                    <ul className="flex gap-1">
                      {content.weakEl.map((weak: string, index: number) => (
                        <li key={index} className="flex flex-col">
                          <abbr title={weak}>
                            <img
                              className="w-8 aspect-square"
                              src={`/icons/${weak}.png`}
                              alt={weak}
                            />
                          </abbr>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

                {content.element.length > 0 && (
                  <li className="border-t border-(--lgrey) py-2.5 flex items-center gap-2.5">
                    <span className="small text-(--grey) min-w-20">속성</span>
                    <ul className="flex gap-1 flex-wrap">
                      {content.element.map((el: string, index: number) => (
                        <li key={index} className="flex flex-col">
                          <abbr title={el}>
                            <img
                              className="w-8 aspect-square"
                              src={`/icons/${el}.png`}
                              alt={el}
                            />
                          </abbr>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

                {content.ailment.length > 0 && (
                  <li className="border-t border-(--lgrey) py-2.5 flex items-center gap-2.5">
                    <span className="small text-(--grey) min-w-20">
                      상태 이상
                    </span>
                    <ul className="flex gap-1 flex-wrap">
                      {content.ailment.map((ail: string, index: number) => (
                        <li key={index} className="flex flex-col">
                          <abbr title={ail}>
                            <img
                              className="w-8 aspect-square"
                              src={`/icons/${ail}.png`}
                              alt={ail}
                            />
                          </abbr>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </section>
          )}
        </div>

        {/* 컨텐츠 정보 */}
        <div className="md:col-start-1 md:col-span-3 md:row-start-1 flex flex-col gap-10">
          {/* 참여 작품 */}
          <section>
            <div className="pb-1 border-b-2 border-(--black) mb-5">
              <h3 className="paragraph font-bold">참여 작품</h3>
            </div>

            <div className="bg-(--cream) ">
              <ol className="grid grid-cols-2 border-t border-l border-(--lgrey)">
                {[1, 2, 3, 4, 5, 6].map((generation: number) => (
                  <li
                    key={generation}
                    className="p-5 border-r border-b border-(--lgrey)">
                    <div className="py-2.5 border-b border-(--lgrey)">
                      <h4 className="subParagraph font-bold">
                        {generation}세대
                      </h4>
                    </div>

                    <ol className="py-5 flex gap-2.5 flex-wrap">
                      {series
                        .filter(
                          (item: Series) =>
                            parseInt(item.series) === generation,
                        )
                        .map((item: Series) => {
                          const isParticipate = content.allSeriesIds.includes(
                            item.id,
                          );

                          return (
                            <li
                              key={item.id}
                              className={`border  p-2.5 ${isParticipate ? "border-(--red) bg-(--red)" : "border-(--lgrey)  bg-(--white)"}`}>
                              <span
                                className={`small ${isParticipate ? "text-(--white)" : "text-(--lgrey)"}`}>
                                {item.title}
                              </span>
                            </li>
                          );
                        })}
                    </ol>
                  </li>
                ))}
                <li></li>
              </ol>
            </div>
          </section>

          {/* 약점 정보 */}
          {content.weak.length > 0 && (
            <section>
              <div className="pb-1 border-b-2 border-(--black) mb-5">
                <h3 className="paragraph font-bold">약점 정보</h3>
              </div>

              <table className="w-full table-fixed border border-(--lgrey)">
                <thead className="bg-(--cream) border-b border-(--lgrey)">
                  <tr>
                    <th className="py-2.5 subParagraph">부위</th>
                    <th className="py-2.5">
                      <img
                        src="/icons/참격.png"
                        alt="참격"
                        className="w-8 block mx-auto"
                      />
                    </th>
                    <th className="py-2.5">
                      <img
                        src="/icons/타격.png"
                        alt="타격"
                        className="w-8 block mx-auto"
                      />
                    </th>
                    <th className="py-2.5">
                      <img
                        src="/icons/탄활.png"
                        alt="탄/활"
                        className="w-8 block mx-auto"
                      />
                    </th>
                    <th className="py-2.5">
                      <img
                        src="/icons/화.png"
                        alt="화속성"
                        className="w-8 block mx-auto"
                      />
                    </th>
                    <th className="py-2.5">
                      <img
                        src="/icons/수.png"
                        alt="수속성"
                        className="w-8 block mx-auto"
                      />
                    </th>
                    <th className="py-2.5">
                      <img
                        src="/icons/뇌.png"
                        alt="뇌속성"
                        className="w-8 block mx-auto"
                      />
                    </th>
                    <th className="py-2.5">
                      <img
                        src="/icons/빙.png"
                        alt="빙속성"
                        className="w-8 block mx-auto"
                      />
                    </th>
                    <th className="py-2.5">
                      <img
                        src="/icons/용.png"
                        alt="용속성"
                        className="w-8 block mx-auto"
                      />
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {content.weak.map((wk: Weak, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-(--lgrey) hover:bg-(--cream) duration-500">
                      {Object.entries(wk).map(([key, value]) => (
                        <td key={key} className="text-center py-2.5">
                          <p className="small">{String(value).split("/")[0]}</p>
                          {String(value).split("/")[1] && (
                            <span className="small text-(--grey)">
                              {String(value).split("/")[1]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* 부위 정보: break */}
          {content.break.length > 0 && (
            <section>
              <div className="pb-1 border-b-2 border-(--black) mb-5">
                <h3 className="paragraph font-bold">부위 정보</h3>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {content.break.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="border border-(--lgrey) bg-(--cream) p-2.5">
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 아이템 정보: items */}
          {(content.flash !== "" ||
            content.dung !== "" ||
            content.sonic !== "" ||
            content.shock !== "" ||
            content.pitfall !== "") && (
            <section>
              <div className="pb-1 border-b-2 border-(--black) mb-5">
                <h3 className="paragraph font-bold">아이템 효과 정보</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                  <img
                    className="w-8 aspect-square"
                    src="/icons/섬광탄.png"
                    alt="섬광탄"
                  />
                  <p
                    className={`small ${content.flash ? "text-(--black)" : "text-(--red)"}`}>
                    {content.flash ? "효과있음" : "효과 없음"}
                  </p>
                </li>
                <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                  <img
                    className="w-8 aspect-square"
                    src="/icons/거름탄.png"
                    alt="거름탄"
                  />
                  <p
                    className={`small ${content.dung ? "text-(--black)" : "text-(--red)"}`}>
                    {content.dung ? "효과있음" : "효과 없음"}
                  </p>
                </li>
                <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                  <img
                    className="w-8 aspect-square"
                    src="/icons/음폭탄.png"
                    alt="음폭탄"
                  />
                  <p
                    className={`small ${content.sonic ? "text-(--black)" : "text-(--red)"}`}>
                    {content.sonic ? "효과있음" : "효과 없음"}
                  </p>
                </li>
                <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                  <img
                    className="w-8 aspect-square"
                    src="/icons/마비덫.png"
                    alt="마비덫"
                  />
                  <p
                    className={`small ${content.shock ? "text-(--black)" : "text-(--red)"}`}>
                    {content.shock ? "효과있음" : "효과 없음"}
                  </p>
                </li>
                <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                  <img
                    className="w-8 aspect-square"
                    src="/icons/구멍함정.png"
                    alt="구멍함정"
                  />
                  <p
                    className={`small ${content.pitfall ? "text-(--black)" : "text-(--red)"}`}>
                    {content.pitfall ? "효과있음" : "효과 없음"}
                  </p>
                </li>
              </ul>
            </section>
          )}

          {/* 크기 정보: size */}
          {(content.small || content.large) && (
            <section>
              <div className="pb-1 border-b-2 border-(--black) mb-5">
                <h3 className="paragraph font-bold">크기 정보</h3>
              </div>

              <div className="flex flex-col md:flex-row border-t border-(--lgrey)">
                <div className="w-full border border-(--lgrey) border-t-0 md:border-r-0 p-5">
                  <h4 className="small text-(--grey) pb-2.5">최소 크기</h4>
                  <strong className="paragraph font-black text-(--black)">
                    {content.small}
                    <span className="text-(--grey) small">cm</span>
                  </strong>
                </div>
                <div className="w-full border border-(--lgrey) border-t-0 md:border-r-0 p-5">
                  <h4 className="small text-(--grey) pb-2.5">평균 크기</h4>
                  <strong className="paragraph font-black text-(--black)">
                    {(parseInt(content.small) + parseInt(content.large)) / 2}
                    <span className="text-(--grey) small">cm</span>
                  </strong>
                </div>
                <div className="w-full border border-(--lgrey) border-t-0 p-5">
                  <h4 className="small text-(--grey) pb-2.5">최대 크기</h4>
                  <strong className="paragraph font-black text-(--black)">
                    {content.large}
                    <span className="text-(--grey) small">cm</span>
                  </strong>
                </div>
              </div>

              <div className="mt-5">
                <h5 className="small text-(--grey)">
                  크기 분포 ({content.small} ~ {content.large})
                </h5>

                <div className="w-full h-2 bg-linear-to-r from-(--yellow) to-(--darkred) mt-2.5" />

                <div className="flex justify-between">
                  <span className="text-(--grey) text-[12px]">
                    {content.small}cm
                  </span>
                  <span className="text-(--grey) text-[12px]">
                    {(parseInt(content.small) + parseInt(content.large)) / 2}cm
                  </span>
                  <span className="text-(--grey) text-[12px]">
                    {content.large}cm
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* 관련 정보: relate */}
          {content.relate.length > 0 && (
            <section>
              <div className="pb-1 border-b-2 border-(--black) mb-5">
                <h3 className="paragraph font-bold">연관 몬스터</h3>
              </div>
              <RelateList list={content.relate} />
            </section>
          )}

          {/* 생태 정보: eco */}
          <section>
            <div className="pb-1 border-b-2 border-(--black) mb-5">
              <h3 className="paragraph font-bold">생태 정보</h3>
            </div>
            <div>
              {content.eco.map((txt: string, index: number) => (
                <p key={index} className="subParagraph text-(--dgrey)">
                  {txt}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
