import { allFolderSizes, bookmarkSliceType, folderSizes } from "@/types/slice/bookmark";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialBookmarkState } from "./initialStates";

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: { ...initialBookmarkState },
  reducers: {
    toggleFavorites: (state, action: PayloadAction<string>) => {
      const fav = state.favorites;
      const newId = action.payload;
      if (!fav.includes(newId)) fav.push(newId);
      else state.favorites = fav.filter((id) => id !== newId);
    },
    removeFavorete: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    setFolderIcon: (state, action: PayloadAction<{ fodler: string; icon: string }>) => {
      const { fodler, icon } = action.payload;
      const icons = state.folderIcons || {};
      icons[fodler] = icon;
      state.folderIcons = icons;
    },
    removeFolderIcon: (state, action: PayloadAction<{ fodler: string }>) => {
      const icons = state.folderIcons;
      if (icons) delete icons[action.payload.fodler];
    },
    changeCurrentFolder: (state, action: PayloadAction<string>) => {
      state.currentFolderID = action.payload;
      state.showFavorites = false;
    },
    changeFolderSize: (state, action: PayloadAction<folderSizes>) => {
      state.folderSize = action.payload;
    },
    toggleShowFavorites: (state) => {
      state.showFavorites = !state.showFavorites;
    },
    toggleLink: (state) => {
      state.linkInNewTab = !state.linkInNewTab;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    setState: (state, action: PayloadAction<{ value: bookmarkSliceType; check?: boolean }>) => {
      const { value, check = true } = action.payload;
      const val = value;
      if (!val) return;
      if (!check) return Object.assign(state, val);
      if (allFolderSizes.includes(val.folderSize)) state.folderSize = val.folderSize;
      if (typeof val.showFavorites === "boolean") state.showFavorites = val.showFavorites;
      if (typeof val.linkInNewTab === "boolean") state.linkInNewTab = val.linkInNewTab;
    },

    resetBookmarkState: (state) => Object.assign(state, initialBookmarkState),
  },
});

export const {
  toggleFavorites,
  changeCurrentFolder,
  changeFolderSize,
  toggleShowFavorites,
  toggleLink,
  resetBookmarkState,
  setState,
  setFavorites,
  removeFavorete,
  removeFolderIcon,
  setFolderIcon,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
