import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ModeType = "light" | "dark";
export type ThemeSliceType = {
  mode: ModeType;
  primaryColor: string;
  blur: number;
  opacity: number;
  roundness: number;
};
const initialState: ThemeSliceType = {
  mode: "light",
  primaryColor: "#0000ff",
  blur: 0,
  roundness: 1,
  opacity: 1,
};
export type numericalThemeValues = "blur" | "opacity" | "roundness";

type SetterFunction =
  | { type: "primaryColor"; value: string }
  | { type: numericalThemeValues; value: number };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    set: (state, action: PayloadAction<SetterFunction>) => {
      const { type, value } = action.payload;

      if (type === "primaryColor") {
        state.primaryColor = value;
      } else {
        state[type] = value as number;
      }
    },
  },
});

export const { toggleMode, set } = themeSlice.actions;
export default themeSlice.reducer;
