import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ModeType = "light" | "dark";
export type ColorsType = { primary: string; secondary: string };
export type ThemeSliceType = {
  mode: ModeType;
  colors: ColorsType;
};
const initialState: ThemeSliceType = {
  mode: "light",
  colors: { primary: "#0000ff", secondary: "#00ff00" },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setColors: (state, action: PayloadAction<ColorsType>) => {
      state.colors = action.payload;
    },
  },
});

export const { setToggle, setColors } = themeSlice.actions;
export default themeSlice.reducer;
