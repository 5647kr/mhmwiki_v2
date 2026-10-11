// 연혁 정렬 조회
export async function fetchHistory() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    const url = new URL(`${baseUrl}series?_sort=open&_order=asc`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("연혁 데이터 조회 실패");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
