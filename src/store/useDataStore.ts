import { create } from "zustand";

interface DashboardTypes {
  searchedValue: string;
  setSearchedValue: (value: string) => void;
}

const useDashboardStore = create<DashboardTypes>((set) => ({
  searchedValue: "",
  setSearchedValue: (value: string) => set(() => ({ searchedValue: value })),
}));

export default useDashboardStore;
