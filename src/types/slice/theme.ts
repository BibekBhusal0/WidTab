export type ModeType = "light" | "dark";
export type numericalThemeValues = "blur" | "opacity" | "roundness" | "gap";

export type ThemeItemType = {
  name: string;
  id: number;
  primaryColor: string;
  mode: ModeType;
  blur: number;
  roundness: number;
  opacity: number;
  gap: number;
  iconPack: string;
  editAble?: boolean;
  image?: string;
};

export type ThemeSliceType = {
  currentThemeID: number;
  allThemes: ThemeItemType[];
};
