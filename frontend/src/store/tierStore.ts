import { create } from "zustand";

interface TierStore {
  draggables: Draggable[];
  setDraggables: (items: Draggable[]) => void;

  tierType: string;
  setTierType: (type: string) => void;

  custom: Custom;
  handleCustom: (key: keyof Custom, value: string) => void;
  resetCustom: (key: keyof Custom) => void;

  activeDraggable: undefined | Draggable;
  setActiveDraggable: (item: undefined | Draggable) => void;
}

export const useTierStore = create<TierStore>()((set) => ({
  draggables: [],
  setDraggables: (items) => {
    set({ draggables: items });
  },

  tierType: "weapon",
  setTierType: (type) => set({ tierType: type }),

  custom: { type: [], series: [] },
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

  activeDraggable: undefined,
  setActiveDraggable: (item) => set({ activeDraggable: item }),
}));
