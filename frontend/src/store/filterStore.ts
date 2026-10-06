import { create } from "zustand";

interface FilterState {
  series: string[];
  type: string[];
  weak: string[];
}

interface FilterStore {
  filterState: FilterState;
  setFilterState: (key: keyof FilterState, vaule: string) => void;
  resetFilterState: (key: keyof FilterState) => void;
}

export const useFilterStore = create<FilterStore>()((set) => ({
  filterState: {
    series: [],
    type: [],
    weak: [],
  },

  setFilterState: (key, value) => {
    set((state) => {
      const currentState = state.filterState[key];
      const isChecked = currentState.includes(value);

      return {
        filterState: {
          ...state.filterState,
          [key]: isChecked
            ? currentState.filter((item) => item !== value)
            : [...currentState, value],
        },
      };
    });
  },

  resetFilterState: (key) => {
    set((state) => ({
      filterState: {
        ...state.filterState,
        [key]: [],
      },
    }));
  },
}));
