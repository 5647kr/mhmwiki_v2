import RelateSkeleton from "./RelateSkeleton";
import unknownIcon from "/icons/unkown.webp";

export default function PageSkeleton() {
  return (
    <>
      {/* hero */}
      <section className="bg-(--cream)">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* img */}
          <div className="flex-2 p-5 flex justify-center items-center ">
            <img
              src={unknownIcon}
              alt="알 수 없음"
              className="w-[65%] object-cover "
            />
          </div>
          {/* 기본 정보 */}
          <div className="flex-1 p-5 flex flex-col justify-center gap-2.5">
            <div className="w-[320px] h-6 bg-(--lgrey) animate-pulse" />

            <div className="mb-2.5 w-75 h-10.5 bg-(--lgrey) animate-pulse" />

            <div>
              <div>
                <div className="w-15 h-4 bg-(--lgrey) animate-pulse" />
                <div className="w-30 h-7.5 bg-(--lgrey) animate-pulse mt-1" />
              </div>

              <div className="mt-2">
                <div className="w-15 h-4 bg-(--lgrey) animate-pulse" />
                <div className="w-30 h-7.5 bg-(--lgrey) animate-pulse mt-1" />
              </div>
            </div>
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
                <div className="w-25 h-7.5 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">종별</span>
                <div className="flex flex-col items-end">
                  <div className="w-15 h-7.5 bg-(--lgrey) animate-pulse" />
                </div>
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">별칭</span>
                <div className="flex flex-col items-end">
                  <div className="w-30 h-7.5 bg-(--lgrey) animate-pulse" />
                </div>
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">종</span>
                <div className="w-30 h-7.5 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">첫 등장 작품</span>
                <div className="w-30 h-7.5 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="border-t border-(--lgrey) py-2.5 flex justify-between items-center gap-2.5">
                <span className="small text-(--grey)">참여 작품 수</span>
                <div className="w-30 h-7.5 bg-(--lgrey) animate-pulse" />
              </li>
            </ul>
          </section>

          {/* 속성 정보 */}
          <section className="bg-(--cream) border border-t-2 border-t-(--black) border-(--lgrey) p-5">
            <div className="pb-5">
              <h3 className="paragraph font-bold">속성 정보</h3>
            </div>
            <ul>
              <li className="border-t border-(--lgrey) py-2.5 flex items-center gap-2.5">
                <span className="small text-(--grey) min-w-20">약점 속성</span>
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                </div>
              </li>

              <li className="border-t border-(--lgrey) py-2.5 flex items-center gap-2.5">
                <span className="small text-(--grey) min-w-20">속성</span>
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                </div>
              </li>

              <li className="border-t border-(--lgrey) py-2.5 flex items-center gap-2.5">
                <span className="small text-(--grey) min-w-20">상태 이상</span>
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                  <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                </div>
              </li>
            </ul>
          </section>
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

                    <div className="py-5 flex gap-2.5 flex-wrap">
                      <div className="w-20 h-10.5 bg-(--lgrey) animate-pulse" />
                      <div className="w-20 h-10.5 bg-(--lgrey) animate-pulse" />
                      <div className="w-20 h-10.5 bg-(--lgrey) animate-pulse" />
                      <div className="w-20 h-10.5 bg-(--lgrey) animate-pulse" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 약점 정보 */}
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
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index} className="border-b border-(--lgrey)">
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                    <td className="text-center py-2.5">
                      <div className="w-8 h-4 mx-auto bg-(--lgrey) animate-pulse" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 부위 정보: break */}
          <section>
            <div className="pb-1 border-b-2 border-(--black) mb-5">
              <h3 className="paragraph font-bold">부위 정보</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                <div className="w-16 h-6 bg-(--lgrey) animate-pulse" />
              </div>
              <div className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                <div className="w-16 h-6 bg-(--lgrey) animate-pulse" />
              </div>
              <div className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                <div className="w-16 h-6 bg-(--lgrey) animate-pulse" />
              </div>
              <div className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                <div className="w-16 h-6 bg-(--lgrey) animate-pulse" />
              </div>
              <div className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                <div className="w-16 h-6 bg-(--lgrey) animate-pulse" />
              </div>
              <div className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <div className="w-8 h-8 bg-(--lgrey) animate-pulse" />
                <div className="w-16 h-6 bg-(--lgrey) animate-pulse" />
              </div>
            </div>
          </section>

          {/* 아이템 정보: items */}
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
                <div className="w-16 h-4 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <img
                  className="w-8 aspect-square"
                  src="/icons/거름탄.png"
                  alt="거름탄"
                />
                <div className="w-16 h-4 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <img
                  className="w-8 aspect-square"
                  src="/icons/음폭탄.png"
                  alt="음폭탄"
                />
                <div className="w-16 h-4 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <img
                  className="w-8 aspect-square"
                  src="/icons/마비덫.png"
                  alt="마비덫"
                />
                <div className="w-16 h-4 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="border border-(--lgrey) bg-(--cream) p-2.5 flex justify-between items-center">
                <img
                  className="w-8 aspect-square"
                  src="/icons/구멍함정.png"
                  alt="구멍함정"
                />
                <div className="w-16 h-4 bg-(--lgrey) animate-pulse" />
              </li>
            </ul>
          </section>

          {/* 크기 정보: size */}
          <section>
            <div className="pb-1 border-b-2 border-(--black) mb-5">
              <h3 className="paragraph font-bold">크기 정보</h3>
            </div>

            <div className="flex flex-col md:flex-row border-t border-(--lgrey)">
              <div className="w-full border border-(--lgrey) border-t-0 md:border-r-0 p-5">
                <h4 className="small text-(--grey) pb-2.5">최소 크기</h4>
                <div className="w-20 h-7.5 bg-(--lgrey) animate-pulse" />
              </div>
              <div className="w-full border border-(--lgrey) border-t-0 md:border-r-0 p-5">
                <h4 className="small text-(--grey) pb-2.5">평균 크기</h4>
                <div className="w-20 h-7.5 bg-(--lgrey) animate-pulse" />
              </div>
              <div className="w-full border border-(--lgrey) border-t-0 p-5">
                <h4 className="small text-(--grey) pb-2.5">최대 크기</h4>
                <div className="w-20 h-7.5 bg-(--lgrey) animate-pulse" />
              </div>
            </div>

            <div className="mt-5">
              <h5 className="small text-(--grey)">크기 분포 (0 ~ 0)</h5>

              <div className="w-full h-2 bg-linear-to-r from-(--yellow) to-(--darkred) mt-2.5" />

              <div className="flex justify-between mt-px">
                <div className="w-10 h-4.5 bg-(--lgrey) animate-pulse" />
                <div className="w-10 h-4.5 bg-(--lgrey) animate-pulse" />
                <div className="w-10 h-4.5 bg-(--lgrey) animate-pulse" />
              </div>
            </div>
          </section>

          {/* 관련 정보: relate */}
          <section>
            <div className="pb-1 border-b-2 border-(--black) mb-5">
              <h3 className="paragraph font-bold">연관 몬스터</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
              <RelateSkeleton />
              <RelateSkeleton />
              <RelateSkeleton />
              <RelateSkeleton />
              <RelateSkeleton />
              <RelateSkeleton />
            </div>
          </section>

          {/* 생태 정보: eco */}
          <section>
            <div className="pb-1 border-b-2 border-(--black) mb-5">
              <h3 className="paragraph font-bold">생태 정보</h3>
            </div>
            <div>
              <div className="w-full h-4.5 bg-(--lgrey) animate-pulse mt-1" />
              <div className="w-full h-4.5 bg-(--lgrey) animate-pulse mt-1" />
              <div className="w-full h-4.5 bg-(--lgrey) animate-pulse mt-1" />
              <div className="w-full h-4.5 bg-(--lgrey) animate-pulse mt-1" />
              <div className="w-full h-4.5 bg-(--lgrey) animate-pulse mt-1" />
              <div className="w-full h-4.5 bg-(--lgrey) animate-pulse mt-1" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
