import { bookmarkSliceType, folderSizes } from "@/types/slice/bookmark";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: bookmarkSliceType = {
  favorites: [],
  showFavorites: false,
  linkInNewTab: true,
  currentFolderID: "1",
  folderSize: "medium",
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<string>) => {
      const fav = state.favorites;
      const newId = action.payload;
      if (!fav.includes(newId)) fav.push(newId);
      else state.favorites = fav.filter((id) => id !== newId);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
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
  },
});

export const {
  toggleFavorites,
  changeCurrentFolder,
  changeFolderSize,
  toggleShowFavorites,
  removeFavorite,
  toggleLink,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
