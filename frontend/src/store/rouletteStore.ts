import toast from "react-hot-toast";
import { create } from "zustand";

interface RouletteStore {
  rouletteItems: RouletteItem[];
  setRouletteItems: (items: RouletteItem[]) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  updateName: (index: number, value: string) => void;
  updateWeight: (index: number, value: string) => void;
}

export const useRouletteStore = create<RouletteStore>()((set) => ({
  rouletteItems: [],

  setRouletteItems: (items: RouletteItem[]) => set({ rouletteItems: items }),

  addItem: () => {
    set((state) => {
      const newItem = {
        name: `새 항목 ${state.rouletteItems.length + 1}`,
        weight: 1,
        color: `hsl(${Math.random() * 360}, 60%, 70%)`,
      };

      return {
        rouletteItems: [...state.rouletteItems, newItem],
      };
    });
  },

  removeItem: (index: number) => {
    set((state) => {
      if (state.rouletteItems.length <= 2) {
        toast.error("최소 2개 항목은 유지해야 합니다.");
        return state;
      }

      return {
        rouletteItems: state.rouletteItems.filter((_, i) => i !== index),
      };
    });
  },

  updateName: (index: number, value: string) => {
    set((state) => ({
      rouletteItems: state.rouletteItems.map((item, i) =>
        i === index ? { ...item, value } : item,
      ),
    }));
  },

  updateWeight: (index: number, value: string) => {
    let num = parseInt(value);
    if (isNaN(num) || num < 1) num = 1;

    set((state) => ({
      rouletteItems: state.rouletteItems.map((item, i) =>
        i === index ? { ...item, weight: num } : item,
      ),
    }));
  },
}));
