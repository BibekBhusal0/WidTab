import { ThemeItemType, ThemeSliceType } from "@/types/slice/theme";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: ThemeSliceType = {
  currentThemeID: "0",
  allThemes: [
    {
      mode: "light",
      id: "0",
      editAble: true,
      primaryColor: "#0000ff",
      blur: 0,
      roundness: 0.2,
      opacity: 1,
    },
    {
      mode: "light",
      id: "1",
      editAble: false,
      primaryColor: "#ff0000",
      blur: 1,
      roundness: 0.7,
      opacity: 0.4,
    },
    {
      mode: "dark",
      id: "2",
      editAble: false,
      primaryColor: "#00ff00",
      blur: 0.5,
      roundness: 0.3,
      opacity: 0.7,
    }
  ],
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    addTheme: (state, action: PayloadAction<ThemeItemType>) => {
      state.allThemes.push({ ...action.payload, id: uuidv4() });
    },
    deleteTheme: (state, action: PayloadAction<string>) => {
      state.allThemes = state.allThemes.filter(
        (p) => p.id !== action.payload && p.editAble
      );
    },
    switchTheme: (state, action: PayloadAction<string>) => {
      if (state.currentThemeID === action.payload) return;
      if (!state.allThemes.find((p) => p.id === action.payload)) return;
      state.currentThemeID = action.payload;
    },
    changeTheme: (state, action: PayloadAction<ThemeItemType>) => {
      const theme = state.allThemes.find((p) => p.id === action.payload.id);
      if (theme) {
        console.log(theme.editAble);
        if (theme.editAble) {
          theme.blur = action.payload.blur;
          theme.editAble = action.payload.editAble;
          theme.opacity = action.payload.opacity;
          theme.primaryColor = action.payload.primaryColor;
          theme.roundness = action.payload.roundness;
          theme.mode = action.payload.mode;
        }
      }
    },
    toggleCurrentMode: (state) => {
      var theme = state.allThemes.find((p) => p.id === state.currentThemeID);
      if (theme) {
        theme.mode = "light" === theme.mode ? "dark" : "light";
      }
    },
  },
});

export const {
  addTheme,
  deleteTheme,
  switchTheme,
  changeTheme,
  toggleCurrentMode,
} = themeSlice.actions;
export default themeSlice.reducer;
