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

interface RouletteItem {
  name: string;
  weight: number;
  color: string;
}

interface Draggable {
  id: string;
  img: string;
  name: string;
  dz?: string;
}

interface Custom {
  type: string[];
  series: string[];
}
