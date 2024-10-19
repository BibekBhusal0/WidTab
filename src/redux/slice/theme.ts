import { ThemeItemType } from "@/types/slice/theme";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getNextId } from "@/utils/next_id";
import { initialThemeState } from "./initialStates";
import { SelectedIconPacks } from "@/icons";

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
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
    changeIconPack: (state, action: PayloadAction<string>) => {
      var theme = state.allThemes.find((p) => p.id === state.currentThemeID);
      if (theme && SelectedIconPacks[action.payload]) {
        theme.iconPack = action.payload;
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
  changeIconPack,
} = themeSlice.actions;
export default themeSlice.reducer;
