import { create } from "zustand";

interface TierStore {
  tierItems: TierItem[];
  setTierItems: (items: TierItem[]) => void;

  tierType: string;
  setTierType: (type: string) => void;

  contentType: string;
  setContentType: (type: string) => void;
}

export const useTierStore = create<TierStore>()((set) => ({
  tierItems: [],

  setTierItems: (items) => {
    set({ tierItems: items });
  },

  tierType: "series",

  setTierType: (type) => set({ tierType: type }),

  contentType: "",
  setContentType: (type) => set({ contentType: type }),
}));
