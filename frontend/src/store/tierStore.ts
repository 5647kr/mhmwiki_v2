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

  dropZones: DropZone[];
  setDropZones: (dropZones: DropZone[]) => void;

  addDropZone: () => void;
  removeDropZone: () => void;
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

  dropZones: [],
  setDropZones: (dropZones) =>
    set({
      dropZones: dropZones,
    }),

  addDropZone: () => {
    set((state) => {
      const tierZones = state.dropZones.filter((zone) => zone.id !== "free");

      const lastZone = tierZones[tierZones.length - 1];

      // F까지 추가 가능
      if (lastZone.id === "F") {
        return state;
      }

      const nextChar = String.fromCharCode(lastZone.id.charCodeAt(0) + 1);

      const newDropZone: DropZone = {
        id: nextChar,
        draggables: [],
      };

      const freeZone = state.dropZones.find((zone) => zone.id === "free");

      return {
        dropZones: [...tierZones, newDropZone, ...(freeZone ? [freeZone] : [])],
      };
    });
  },

  removeDropZone: () => {
    set((state) => {
      const tierZones = state.dropZones.filter((zone) => zone.id !== "free");

      // S, A만 남았으면 삭제하지 않음
      if (tierZones.length <= 2) {
        return state;
      }

      // 마지막 티어
      const removeZone = tierZones[tierZones.length - 1];

      const freeZone = state.dropZones.find((zone) => zone.id === "free");

      if (!freeZone) {
        return state;
      }

      const updatedFreeDraggables = [
        ...freeZone.draggables,
        ...removeZone.draggables,
      ];

      const updatedTierZones = tierZones.slice(0, -1);

      return {
        dropZones: [
          ...updatedTierZones,
          {
            ...freeZone,
            draggables: updatedFreeDraggables,
          },
        ],
      };
    });
  },
}));
