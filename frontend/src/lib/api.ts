const baseurl = import.meta.env.VITE_BASIC_URL;

export async function fetchData({
  table,
  sort,
  order,
}: {
  table: string;
  sort?: string;
  order?: string;
}) {
  try {
    let url = `${baseurl}${table}`;

    if (sort) {
      url = `${url}?_sort=${sort}`;
    }

    if (order) {
      url = `${url}&_order=${order}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("fetch 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchOneData({
  id,
  search,
  randomNum,
}: {
  id?: string;
  search?: string;
  randomNum?: number;
}) {
  try {
    let url = `${baseurl}monster`;

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
      throw new Error("검색 조회에 실패했습니다.");
    }

    const data = response.json();

    return data;
  } catch (error) {
    return error;
  }
}

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
    const url = new URL("monster", baseurl);

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

    const response = await fetch(url.toString());

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
