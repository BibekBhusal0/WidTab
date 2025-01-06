import { getFromStorage, setInStorage, STORAGE_KEYS } from "./";
import {
  allFolderSizes,
  bookmarkStateType,
  folderSizes,
} from "@/types/slice/bookmark";
import { initialBookmarkState } from "./initialStates";

const BOOKMARK_STORAGE_KEY = STORAGE_KEYS.bookmark;

export const getBookmarkState = async () => {
  return (
    ((await getFromStorage(BOOKMARK_STORAGE_KEY)) as bookmarkStateType) || {
      ...initialBookmarkState,
    }
  );
};

function fixState(state: bookmarkStateType) {
  const val = state;
  const newState: bookmarkStateType = { ...initialBookmarkState };
  if (!val) return false;
  if (allFolderSizes.includes(val.folderSize))
    newState.folderSize = val.folderSize;
  if (typeof val.showFavorites === "boolean")
    newState.showFavorites = val.showFavorites;
  if (typeof val.linkInNewTab === "boolean")
    newState.linkInNewTab = val.linkInNewTab;
  return newState;
}

export async function toggleFavorites(id: string) {
  const state = await getBookmarkState();
  setInStorage(BOOKMARK_STORAGE_KEY, {
    ...state,
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((i) => i !== id)
      : [...state.favorites, id],
  });
}
export async function changeCurrentFolder(id: string) {
  const state = await getBookmarkState();
  setInStorage(BOOKMARK_STORAGE_KEY, { ...state, currentFolderID: id });
}
export async function changeFolderSize(size: folderSizes) {
  const state = await getBookmarkState();
  setInStorage(BOOKMARK_STORAGE_KEY, { ...state, folderSize: size });
}
export async function toggleShowFavorites() {
  const state = await getBookmarkState();
  setInStorage(BOOKMARK_STORAGE_KEY, {
    ...state,
    showFavorites: !state.showFavorites,
  });
}
export async function toggleLink() {
  const state = await getBookmarkState();
  setInStorage(BOOKMARK_STORAGE_KEY, {
    ...state,
    linkInNewTab: !state.linkInNewTab,
  });
}
export async function resetBookmarkState() {
  setInStorage(BOOKMARK_STORAGE_KEY, initialBookmarkState);
}
export async function setBookmarkState(state: bookmarkStateType) {
  const newState = fixState(state);
  if (!newState) return;
  setInStorage(BOOKMARK_STORAGE_KEY, newState);
}
