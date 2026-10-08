import {
  ArrowRight,
  Ban,
  Camera,
  CircleCheck,
  MessageCircleMore,
  Plus,
  SearchAlert,
  TriangleAlert,
} from "lucide-react";
import { useQueryHook } from "../../hook/useQueryHook";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Inquiry() {
  const menus = [
    {
      id: "error",
      title: "오류 수정",
      desc: `수치, 이름, 속성 등 잘못 표기된 정보`,
      icon: TriangleAlert,
    },
    {
      id: "omit",
      title: "정보 누락",
      desc: `누락된 몬스터, 출현 시리즈, 약점 데이터 등`,
      icon: Plus,
    },
    {
      id: "new",
      title: "신규 발견",
      desc: `미등록 몬스터 또는 새로 확인된 데이터`,
      icon: SearchAlert,
    },
    {
      id: "etc",
      title: "기타",
      desc: `텍스트 오류, 이미지 문제, ui 오류 등`,
      icon: MessageCircleMore,
    },
  ];
  const { data: series } = useQueryHook({
    table: "series",
    sort: "open",
    order: "asc",
  });
  const [reportForm, setReportForm] = useState({
    reportType: "error",
    monster: "",
    series: "MH",
    title: "",
    desc: "",
    source: "",
    file: null,
  });

  const handleReportForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if ("files" in e.target && e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("파일 용량은 10MB를 초과할 수 없습니다.");
        e.target.value = "";
        return;
      }

      setReportForm((reportForm) => ({
        ...reportForm,
        [e.target.name]: selectedFile,
      }));
      return;
    }

    setReportForm((reportForm) => ({
      ...reportForm,
      [e.target.name]: e.target.value,
    }));
  };

  const submitReportForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const inquiryType = menus.find((menu) => menu.id === reportForm.reportType);

    const messageText = `
    🔔 **제보 접수!**
    **제보 유형:** ${inquiryType?.title}
    **관련 몬스터:** ${reportForm.monster || "없음"}
    **시리즈:** ${reportForm.series}
    **제목:** ${reportForm.title}
    **내용:** ${reportForm.desc}
    **출처:** ${reportForm.source || "없음"}
  `;

    formData.append("payload_json", JSON.stringify({ content: messageText }));

    if (reportForm.file) {
      formData.append("files[0]", reportForm.file);
    }

    const reportURL = import.meta.env.VITE_DISCORD_REPORT;

    try {
      const response = await fetch(reportURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("제보가 성공적으로 접수되었습니다. 감사합니다!");
        setReportForm({
          reportType: "error",
          monster: "",
          series: "MH",
          title: "",
          desc: "",
          source: "",
          file: null,
        });

        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        toast.error("제보 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      console.log(error);
      toast.error("네트워크 오류 발생");
    }
  };

  return (
    <>
      <div className="bg-(--cream)">
        <section className="w-full max-w-7xl mx-auto p-5">
          <div className="flex items-center gap-2.5 pb-5">
            <h3 className="text-(--grey) small">제보 유형 선택</h3>
            <hr className="flex-1 border-0.5 border-(--grey)" />
          </div>

          <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {menus.map((menu) => {
              const IconComponent = menu.icon;
              const isSelected = reportForm.reportType === menu.id;

              return (
                <li className="w-full" key={menu.id}>
                  <label
                    className={`${isSelected ? "border-(--red)" : "border-(--lgrey)"} border w-full py-5 px-2.5 cursor-pointer flex flex-col gap-2.5 bg-(--white) relative`}>
                    <IconComponent
                      className={`${isSelected ? "text-(--black)" : "text-(--grey)"}`}
                    />
                    <strong
                      className={`${isSelected ? "text-(--black)" : "text-(--grey)"} subHeadingTitle font-bold`}>
                      {menu.title}
                    </strong>
                    <p
                      className={`${isSelected ? "text-(--black)" : "text-(--grey)"} small`}>
                      {menu.desc}
                    </p>
                    <input
                      type="radio"
                      name="reportType"
                      value={menu.id}
                      className="absolute top-5 right-5 accent-(--red)"
                      checked={reportForm.reportType === menu.id}
                      onChange={handleReportForm}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* 제보 내용 작성 */}
      <div className="bg-(--white)">
        <section className="w-full max-w-7xl mx-auto p-5">
          <div className="flex items-center gap-2.5 pb-5">
            <h3 className="text-(--grey) small">제보 내용 작성</h3>
            <hr className="flex-1 border-0.5 border-(--grey)" />
          </div>

          <div>
            <div className="p-2.5 border border-(--lgrey) bg-(--cream)">
              <h4 className="paragraph font-bold text-(--black)">
                REPORT FORM
              </h4>
            </div>
            <form onSubmit={submitReportForm} className="flex flex-col">
              {/* 몬스터 */}
              <div className="flex items-center border-b border-x border-(--lgrey)">
                <label
                  htmlFor="monster"
                  className="p-2.5 w-24 border-r border-(--lgrey) flex items-center small">
                  몬스터
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <input
                  type="text"
                  id="monster"
                  name="monster"
                  required
                  autoComplete="off"
                  value={reportForm.monster}
                  onChange={handleReportForm}
                  className="p-2.5 flex-1 placeholder:text-(--grey) small"
                  placeholder="예) 리오레우스, 네르기간테..."
                />
              </div>

              {/* 시리즈 */}
              <div className="flex items-center border-b border-x  border-(--lgrey)">
                <label
                  htmlFor="series"
                  className="p-2.5 w-24 border-r border-(--lgrey) flex items-center small">
                  시리즈
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <select
                  className="p-2 flex-1 placeholder:text-(--grey) small"
                  name="series"
                  id="series"
                  value={reportForm.series}
                  onChange={handleReportForm}>
                  {series?.map((item: Series) => (
                    <option value={item.title} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* 제목 */}
              <div className="flex items-center border-b border-x border-(--lgrey)">
                <label
                  htmlFor="title"
                  className="p-2.5 w-24 border-r border-(--lgrey) flex items-center small">
                  제목
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={reportForm.title}
                  onChange={handleReportForm}
                  autoComplete="off"
                  className="p-2.5 flex-1 placeholder:text-(--grey) small"
                  placeholder="제보 내용을 한 줄로 요약해주세요."
                />
              </div>

              {/* 상세 내용 */}
              <div className="flex items-center border-b border-x  border-(--lgrey)">
                <label
                  htmlFor="desc"
                  className="w-24 p-2.5  flex items-start justify-center flex-col border-r border-(--lgrey) h-40 small">
                  상세 <br />
                  내용
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  required
                  value={reportForm.desc}
                  onChange={handleReportForm}
                  autoComplete="off"
                  className="focus:outline-none p-2.5 flex-1 h-40 resize-none small placeholder:text-(--grey)"
                  placeholder="현재 잘못된 내용과 올바른 내용을 구체적으로 작성해주세요.

예)리오레우스의 용속성 약점이 1로 표기되어 있으나 MHWs 기준 10이 맞습니다.
                "
                />
              </div>

              {/* 출처 */}
              <div className="flex items-center border-b border-x border-(--lgrey)">
                <label
                  htmlFor="source"
                  className="p-2.5 w-24 border-r border-(--lgrey) flex items-center small">
                  출처 / 근거
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={reportForm.source}
                  onChange={handleReportForm}
                  autoComplete="off"
                  className="focus:outline-none p-2.5 flex-1 placeholder:text-(--grey) small"
                  placeholder="공식 문서, 영상 url, 인게임 직접 확인 등"
                />
              </div>

              {/* 첨부 파일 */}
              <div className="flex items-center border-b border-x  border-(--lgrey)">
                <label
                  htmlFor="file"
                  className="p-2.5 w-24 border-r border-(--lgrey) flex items-center small">
                  첨부 파일
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  name="file"
                  onChange={handleReportForm}
                  className="focus:outline-none p-2.5 flex-1 placeholder:text-(--grey) small cursor-pointer"
                  placeholder="공식 문서, 영상 url, 인게임 직접 확인 등"
                />
              </div>

              {/* 제보 가이드라인 */}
              <div className="py-10 bg-(--white)">
                <div className="flex items-center gap-2.5 pb-5">
                  <h3 className="text-(--grey) small font-normal">
                    제보 가이드라인
                  </h3>
                  <hr className="flex-1 border-0.5 border-(--lgrey)" />
                </div>

                <div>
                  <div className="p-2.5 border border-(--lgrey) bg-(--cream)">
                    <h4 className="paragraph syne font-bold text-(--black)">
                      GUIDELINE
                    </h4>
                  </div>
                  <ul className="flex flex-col border-x border-(--lgrey)">
                    <li className="p-2.5 border-b border-(--lgrey) flex gap-2.5 items-center">
                      <CircleCheck stroke="var(--cyan)" strokeWidth={2} />
                      <div>
                        <h5 className="subParagraph text-(--black) font-bold mb-px">
                          구체적으로 작성해주세요.
                        </h5>

                        <p className="small text-(--grey)">
                          어느 작품의 어느 몬스터인지, 무엇이 잘못되었고 무엇이
                          맞는지를 명확히 적어주세요.
                        </p>
                      </div>
                    </li>
                    <li className="p-2.5 border-b border-(--lgrey) flex gap-2.5 items-center">
                      <Camera />
                      <div>
                        <h5 className="subParagraph text-(--black) font-bold mb-px">
                          스크린샷을 첨부하면 빠른 수정이 가능합니다.
                        </h5>

                        <p className="small text-(--grey)">
                          인게임 화면이나 공략서 사진이 있다면 빠르게
                          반영됩니다.
                        </p>
                      </div>
                    </li>
                    <li className="p-2.5 border-b border-(--lgrey) flex gap-2.5 items-center">
                      <Ban stroke="var(--red)" strokeWidth={2} />
                      <div>
                        <h5 className="subParagraph text-(--red) font-bold mb-px">
                          중복 제보는 피해주세요.
                        </h5>

                        <p className="small text-(--grey)">
                          같은 내용을 여러 번 제보하면 처리가 지연됩니다
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="py-5 bg-(--white)">
                <button
                  type="submit"
                  className="bg-(--red) w-full p-5 flex items-center justify-between">
                  <span className="text-(--white) subHeadingTitle font-bold">
                    제보 접수하기
                  </span>
                  <ArrowRight size={20} stroke="var(--white)" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
