import { getFromStorage, setInStorage, STORAGE_KEYS } from "./";
import { getNextId } from "@/utils/next_id";
import { initialThemeState } from "./initialStates";
import { ThemeItemType, themeStateType } from "@/types/slice/theme";

const THEME_STORAGE_KEY = STORAGE_KEYS.theme;

export const getThemeState = async () => {
  return (
    ((await getFromStorage(THEME_STORAGE_KEY)) as themeStateType) || {
      initialThemeState,
    }
  );
};
export async function findTheme(id: number) {
  const state = await getThemeState();

  return state.allThemes.find((p) => p.id === id);
}
export async function addTheme(theme: ThemeItemType) {
  const state = await getThemeState();
  const newID = getNextId(state.allThemes.map(({ id }) => id));
  const newState: themeStateType = {
    ...state,
    allThemes: [...state.allThemes, { ...theme, id: newID, editAble: true }],
  };
  setInStorage(THEME_STORAGE_KEY, newState);
}
export async function deleteTheme(id: number) {
  const state = await getThemeState();
  const newState: themeStateType = {
    ...state,
    allThemes: state.allThemes.filter((p) => p.id !== id),
  };
  if (newState.currentThemeID === id)
    newState.currentThemeID = newState.allThemes[0].id;
  setInStorage(THEME_STORAGE_KEY, newState);
}
export async function duplicateTheme(id: number) {
  const theme = await findTheme(id);
  if (theme) addTheme(theme);
}
export async function switchTheme(id: number) {
  const state = await getThemeState();
  const t = findTheme(id);
  if (!t) return;
  const newState: themeStateType = {
    ...state,
    currentThemeID: id,
  };
  setInStorage(THEME_STORAGE_KEY, newState);
}
export async function changeTheme(theme: ThemeItemType) {
  const state = await getThemeState();
  const t = await findTheme(theme.id);
  if (!t || !t.editAble) return;
  const newState: themeStateType = {
    ...state,
    allThemes: state.allThemes.map((p) =>
      p.id === theme.id ? { ...p, ...theme } : p
    ),
  };
  setInStorage(THEME_STORAGE_KEY, newState);
}
export async function toggleCurrentMode() {
  const state = await getThemeState();
  const newState: themeStateType = {
    ...state,
    allThemes: state.allThemes.map((p) =>
      p.id === state.currentThemeID
        ? { ...p, mode: "light" === p.mode ? "dark" : "light" }
        : p
    ),
  };
  setInStorage(THEME_STORAGE_KEY, newState);
}
export async function changeIconPack(iconPack: string) {
  const state = await getThemeState();
  const newState: themeStateType = {
    ...state,
    allThemes: state.allThemes.map((p) =>
      p.id === state.currentThemeID ? { ...p, iconPack } : p
    ),
  };
  setInStorage(THEME_STORAGE_KEY, newState);
}
export function resetTheme() {
  setInStorage(THEME_STORAGE_KEY, initialThemeState);
}
export function fixTheme(state: themeStateType) {
  const newState: themeStateType = { ...state };
  const val = state;
  if (!val || !val.allThemes) return false;
  if (!Array.isArray(val.allThemes)) return false;
  if (typeof val.currentThemeID === "number")
    newState.currentThemeID = val.currentThemeID;
  const allThemes = [...newState.allThemes];

  for (const theme of val.allThemes) {
    const th = allThemes.find((p) => p.id === theme.id);
    if (theme.image && theme.image.startsWith("storageId/"))
      theme.image = undefined;
    if (th && (theme.editAble === false || th.name === theme.name)) {
      Object.assign(th, theme);
    } else {
      const id = getNextId(allThemes.map(({ id }) => id));
      if (theme.id === val.currentThemeID) newState.currentThemeID = id;
      allThemes.push({ ...theme, editAble: true, id });
    }
  }
  newState.allThemes = allThemes;
  return newState;
}
export function setThemeState(state: themeStateType) {
  const newState = fixTheme(state);
  if (newState) setInStorage(THEME_STORAGE_KEY, newState);
}
export async function setBackgroundImage(image: string | undefined) {
  const state = await getThemeState();
  setInStorage(THEME_STORAGE_KEY, {
    ...state,
    allThemes: state.allThemes.map((p) =>
      p.id === state.currentThemeID ? { ...p, image } : p
    ),
  });
}
