import { ThemeItemType, ThemeSliceType } from "@/types/slice/theme";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ThemeSliceType = {
  currentThemeID: 2,
  allThemes: [
    {
      name: "red",
      mode: "light",
      id: 1,
      editAble: false,
      primaryColor: "#ff0000",
      blur: 1,
      roundness: 0.7,
      opacity: 0.4,
    },
    {
      name: "green",
      mode: "dark",
      id: 2,
      editAble: false,
      primaryColor: "#00ff00",
      blur: 0.5,
      roundness: 0.3,
      opacity: 0.7,
    },
    {
      name: "blue",
      mode: "light",
      id: 0,
      editAble: true,
      primaryColor: "#0000ff",
      blur: 0,
      roundness: 0.2,
      opacity: 1,
    },
  ],
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    addTheme: (state, action: PayloadAction<ThemeItemType>) => {
      const newID = getNextId(state.allThemes.map(({ id }) => id));
      state.allThemes.push({ ...action.payload, id: newID });
      state.currentThemeID = newID;
    },
    deleteTheme: (state, action: PayloadAction<number>) => {
      const themeToDelete = state.allThemes.find(
        (p) => p.id === action.payload
      );
      if (themeToDelete?.editAble) {
        state.allThemes = state.allThemes.filter(
          (p) => p.id !== action.payload
        );
        if (state.currentThemeID === action.payload) {
          state.currentThemeID = state.allThemes[0].id;
        }
      }
    },
    switchTheme: (state, action: PayloadAction<number>) => {
      if (state.currentThemeID === action.payload) return;
      if (!state.allThemes.find((p) => p.id === action.payload)) return;
      state.currentThemeID = action.payload;
    },
    changeTheme: (state, action: PayloadAction<ThemeItemType>) => {
      const theme = state.allThemes.find((p) => p.id === action.payload.id);
      if (theme) {
        if (theme.editAble) {
          theme.blur = action.payload.blur;
          theme.editAble = action.payload.editAble;
          theme.opacity = action.payload.opacity;
          theme.primaryColor = action.payload.primaryColor;
          theme.roundness = action.payload.roundness;
          theme.mode = action.payload.mode;
          theme.name = action.payload.name;
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
