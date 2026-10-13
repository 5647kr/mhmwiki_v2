type TableProps = "series" | "type" | "weak";

// 시리즈 & 타입 & 약점 데이터 조회
export default async function fetchMetaData({ table }: { table: TableProps }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}${table}`);

    if (!response.ok) {
      throw new Error("필터링 목록 조회 실패");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
