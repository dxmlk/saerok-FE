import { atom } from "recoil";

export interface SelectedFilters {
  habitats: string[];
  seasons: string[];
  sizeCategories: string[];
}

export const filtersState = atom<SelectedFilters>({
  key: "filtersState",
  default: { habitats: [], seasons: [], sizeCategories: [] },
});

export const searchTermState = atom<string>({
  key: "searchTermState",
  default: "",
});
