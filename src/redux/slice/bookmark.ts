import {
  allFolderSizes,
  bookmarkSliceType,
  folderSizes,
} from "@/types/slice/bookmark";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialBookmarkState } from "./initialStates";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: { ...initialBookmarkState },
  reducers: {
    toggleFavorites: (state, action: PayloadAction<string>) => {
      const fav = state.favorites;
      const newId = action.payload;
      if (!fav.includes(newId)) fav.push(newId);
      else state.favorites = fav.filter((id) => id !== newId);
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
    setBookmarkState: (state, action: PayloadAction<bookmarkSliceType>) => {
      const val = action.payload;
      if (!val) return;
      if (allFolderSizes.includes(val.folderSize))
        state.folderSize = val.folderSize;
      if (typeof val.showFavorites === "boolean")
        state.showFavorites = val.showFavorites;
      if (typeof val.linkInNewTab === "boolean")
        state.linkInNewTab = val.linkInNewTab;
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
  setBookmarkState,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
