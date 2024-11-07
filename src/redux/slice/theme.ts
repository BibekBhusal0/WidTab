import { ThemeItemType, ThemeSliceType } from "@/types/slice/theme";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getNextId } from "@/utils/next_id";
import { initialThemeState } from "./initialStates";
import { SelectedIconPacks } from "@/theme/icons";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { ...initialThemeState },
  reducers: {
    addTheme: (state, action: PayloadAction<ThemeItemType>) => {
      const newID = getNextId(state.allThemes.map(({ id }) => id));
      state.allThemes.push({ ...action.payload, id: newID, editAble: true });
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
    duplicateCurrentTheme: (state) => {
      const theme = state.allThemes.find((p) => p.id === state.currentThemeID);
      if (theme) {
        const newID = getNextId(state.allThemes.map(({ id }) => id));
        state.allThemes.push({ ...theme, id: newID, editAble: true });
        state.currentThemeID = newID;
      }
    },
    duplicateTheme: (state, action: PayloadAction<number>) => {
      const theme = state.allThemes.find((p) => p.id === action.payload);
      if (theme) {
        const newID = getNextId(state.allThemes.map(({ id }) => id));
        state.allThemes.push({ ...theme, id: newID, editAble: true });
        state.currentThemeID = newID;
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
          Object.assign(theme, action.payload);
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
    resetThemeSlice: (state) => {
      state = { ...initialThemeState };
    },
    setState: (state, action: PayloadAction<ThemeSliceType>) => {
      const val = action.payload;
      if (!val) return;

      if (val.allThemes) {
        if (Array.isArray(val.allThemes)) {
          const allThemes = [...state.allThemes];
          val.allThemes.forEach((p) => {
            allThemes.push({
              ...p,
              id: getNextId(allThemes.map(({ id }) => id)),
            });
          });
          state.allThemes = allThemes;
        }
      }
      if (val.currentThemeID) state.currentThemeID = val.currentThemeID;
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
  duplicateCurrentTheme,
  duplicateTheme,
  resetThemeSlice,
} = themeSlice.actions;
export default themeSlice.reducer;
