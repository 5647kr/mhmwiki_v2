import { create } from "zustand";

interface Custom {
  type: string[];
  series: string[];
}

interface WorldCupStore {
  // 페이지 진행 사항 settings -> progress -> result
  status: "settings" | "progress" | "result";
  cupType: "all" | "custom";
  round: "16" | "32" | "64" | "allContent";
  custom: Custom;
  winner: null | Content;

  handleStatus: (value: "settings" | "progress" | "result") => void;
  handleType: (value: "all" | "custom") => void;
  handleRound: (value: "16" | "32" | "64" | "allContent") => void;
  handleCustom: (key: keyof Custom, value: string) => void;
  resetCustom: (key: keyof Custom) => void;
  handleWinner: (content: Content) => void;
}

export const useWorldCupStore = create<WorldCupStore>()((set) => ({
  status: "settings",
  cupType: "all",
  round: "16",
  custom: { type: [], series: [] },
  winner: null,

  handleStatus: (value) => set({ status: value }),

  handleType: (value) => set({ cupType: value }),

  handleRound: (value) => set({ round: value }),

  handleCustom: (key, value) => {
    set((state) => {
      const currentState = state.custom[key];
      const isChecked = currentState.includes(value);

      return {
        custom: {
          ...state.custom,
          [key]: isChecked
            ? currentState.filter((item) => item !== value)
            : [...currentState, value],
        },
      };
    });
  },

  resetCustom: (key) => {
    set((state) => ({
      custom: {
        ...state.custom,
        [key]: [],
      },
    }));
  },

  handleWinner: (content) => set({ winner: content }),
}));
