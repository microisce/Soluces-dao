import { create } from "zustand";

interface DashboardTypes {
  searchedValue: string;
  setSearchedValue: (value: string) => void;
  token: string;
  setToken: (token: string) => void;
}

const useDashboardStore = create<DashboardTypes>((set) => ({
  searchedValue: "",
  setSearchedValue: (value: string) => set(() => ({ searchedValue: value })),

  token: "",
  setToken: (token: string) => set(() => ({ token })),
}));

export default useDashboardStore;
