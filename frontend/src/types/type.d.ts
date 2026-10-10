interface Series {
  id: string;
  title: string;
  fullName: string;
  koTitle: string;
  series: string;
  open: string;
  platform: string;
}

interface Type {
  id: string;
  title: string;
}

interface Weak {
  id: string;
  title: string;
}

interface Content {
  id: string;
  img: string;
  icon: string;
  name: string;
  nickname1: string;
  nickname2: string;
  type: string;
  species: string;
  seriesId: string[];
  infoSeriesId: string[];
  title: string | null;
  titleId: string | null;
  weakEl: string[];
  element: string[];
  ailment: string[];
  small: string;
  large: string;
  flash: boolean;
  sonic: boolean;
  dung: boolean;
  shock: boolean;
  pitfall: boolean;
  break: string[];
  weak: Weak[];
  relate: Relate[];
  eco: string[];
}

interface Weak {
  부위: string;
  참격: string;
  타격: string;
  "탄/활": string;
  화: string;
  수: string;
  뇌: string;
  빙: string;
  용: string;
}

interface Relate {
  id: string;
  icon: string[];
  name: string;
  type: string;
  species: string;
}

interface RouletteItem {
  name: string;
  weight: number;
  color: string;
}
