import browser from "webextension-polyfill";
import { useEffect, useState } from "react";
import {
  initialBookmarkState,
  initialNoteState,
  initialHabitTrackerState,
  initialLayoutState,
  initialThemeState,
  initialTodoState,
} from "./initialStates";
import { bookmarkStateType } from "@/types/slice/bookmark";
import { noteStateType } from "@/types/slice/notes";
import { themeStateType } from "@/types/slice/theme";
import { todoStateType } from "@/types/slice/todo";
import { habitTrackerStateType } from "@/types/slice/habit-tracker";
import { layoutStateType } from "@/types/slice/layout";

const sk = [
  "bookmark",
  "note",
  "todo",
  "habitTracker",
  "layout",
  "theme",
] as const;
export type StorageKeys = (typeof sk)[number];
export const allStorageKeys: StorageKeys[] = [...sk];

export const STORAGE_KEYS: Record<StorageKeys, string> = {
  bookmark: "bookmark",
  note: "note",
  todo: "todo",
  habitTracker: "habitTracker",
  layout: "layout",
  theme: "theme",
};

export const getFromStorage = (key: string) => {
  return browser.storage.local.get(key).then(
    (result) => {
      //   if (typeof result[key] === "string") return JSON.parse(result[key]);
      return result[key] as any;
    },
    (error) => Promise.reject(error)
  );
};

export const setInStorage = (key: string, value: any) => {
  return browser.storage.local.set({ [key]: value }).then(
    () => true,
    (error) => Promise.reject(error)
  );
};

export const useStorage = <T>(storageKey: string, initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const fetchFromStorage = async () => {
      const storedValue: T | undefined = await getFromStorage(storageKey);
      if (storedValue) setState(storedValue);
      else setInStorage(storageKey, state);
    };
    fetchFromStorage();

    const onStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      namespace: string
    ) => {
      if (namespace === "local" && changes[storageKey]) {
        setState(changes[storageKey].newValue);
      }
    };

    browser.storage.onChanged.addListener(onStorageChange);
    return () => browser.storage.onChanged.removeListener(onStorageChange);
  }, [storageKey, state]);

  return { ...state };
};
export const useBookmarkState = () => {
  return useStorage<bookmarkStateType>(
    STORAGE_KEYS.bookmark,
    initialBookmarkState
  );
};
export const useNote = () => {
  return useStorage<noteStateType>(STORAGE_KEYS.note, initialNoteState);
};
export const useHabitTracker = () => {
  return useStorage<habitTrackerStateType>(
    STORAGE_KEYS.habitTracker,
    initialHabitTrackerState
  );
};
export const useLayout = () => {
  return useStorage<layoutStateType>(STORAGE_KEYS.layout, initialLayoutState);
};
export const useThemeState = () => {
  return useStorage<themeStateType>(STORAGE_KEYS.theme, initialThemeState);
};
export const useTodo = () => {
  return useStorage<todoStateType>(STORAGE_KEYS.todo, initialTodoState);
};
