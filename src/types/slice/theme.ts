export type ModeType = "light" | "dark";
export type numericalThemeValues = "blur" | "opacity" | "roundness";

export type ThemeItemType = {
  id: string;
  primaryColor: string;
  mode: ModeType;
  blur: number;
  roundness: number;
  opacity: number;
  editAble?: boolean;
};

export type ThemeSliceType = {
  currentThemeID: string;
  allThemes: ThemeItemType[];
};
