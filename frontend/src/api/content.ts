const baseUrl = import.meta.env.VITE_BASE_URL;

// 몬스터 기본 조회: 무한 스크롤
export async function fetchContent({
  page,
  pageNum,
  filterState,
}: {
  page: number;
  pageNum: number;
  filterState: { series: string[]; type: string[]; weak: string[] };
}) {
  try {
    const url = new URL("monster", baseUrl);

    if (page) {
      url.searchParams.append("_page", String(page));
      url.searchParams.append("_limit", String(pageNum));
    }

    if (filterState) {
      filterState.series.forEach((series) =>
        url.searchParams.append("baseSeriesIds_like", series),
      );
      filterState.type.forEach((type) =>
        url.searchParams.append("type_like", `^${type}`),
      );
      filterState.weak.forEach((weak) =>
        url.searchParams.append("weakEl_like", weak),
      );
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("컨텐츠 fetch 실패");
    }

    const data = await response.json();

    const headers = response.headers.get("X-Total-Count");
    const totalCount = headers ? parseInt(headers, 10) : 0;

    return {
      data,
      nextPage: pageNum >= totalCount ? undefined : page + 1,
      isLastPage: page * pageNum >= totalCount,
      totalCount,
    };
  } catch (error) {
    console.log(error);
  }
}

// 몬스터 단일 조회: 검색 & 상세 조회
export async function fetchOneContent({
  id,
  search,
  randomNum,
}: {
  id?: string;
  search?: string;
  randomNum?: number;
}) {
  try {
    let url = `${baseUrl}monster`;

    if (id) {
      url = `${url}/${id}`;
    }

    if (search) {
      const trimSearch = search.replace(/\s+/g, "");

      const formatQuery = trimSearch.split("").join(".*");

      url = `${url}?name_like=${formatQuery}`;
    }

    if (randomNum) {
      const randomContent = Math.floor(Math.random() * randomNum) + 1;

      url = `${url}?_page=${randomContent}&_limit=1`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("컨텐츠를 찾을 수 없습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

// 몬스터 이상형 월드컵 && 티어 조회
export async function fetchCustomContent({
  custom,
}: {
  custom: { series: string[]; type: string[] };
}) {
  try {
    const url = new URL(`${baseUrl}monster`);

    if (custom.series) {
      custom.series.forEach((s) =>
        url.searchParams.append("allSeriesIds_like", s),
      );
    }

    if (custom.type) {
      custom.type.forEach((t) => url.searchParams.append("type_like", `^${t}`));
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("커스텀 컨텐츠를 찾을 수 없습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

// 룰렛 조회
export async function fetchRouletteContent({
  seriesId,
}: {
  seriesId?: string;
}) {
  try {
    const url = new URL(`${baseUrl}monster?allSeriesIds_like=${seriesId}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("룰렛 컨텐츠를 찾을 수 없습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
