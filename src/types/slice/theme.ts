export type ModeType = "light" | "dark";
export type numericalThemeValues = "blur-sm" | "opacity" | "roundness";

export type ThemeItemType = {
  name: string;
  id: number;
  primaryColor: string;
  mode: ModeType;
  blur: number;
  roundness: number;
  opacity: number;
  iconPack: string;
  editAble?: boolean;
  image?: string;
};

export type ThemeSliceType = {
  currentThemeID: number;
  allThemes: ThemeItemType[];
};
