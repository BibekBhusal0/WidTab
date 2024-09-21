import { ModeType } from "@/redux/slice/theme";

export type ThemeItemType = {
  id: string;
  primaryColor: string;
  mode: ModeType;
  blur: number;
  roundness: number;
  opacity: number;
  deleteAble?: boolean;
};

export type ThemeSliceType = {
  currentThemeID: number;
  allThemes: ThemeItemType[];
};
