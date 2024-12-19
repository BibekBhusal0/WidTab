import { configureStore, Reducer } from "@reduxjs/toolkit";
import themeReducer from "./slice/theme";
import todoReducer from "./slice/todo";
import layoutReducer from "./slice/layout";
import habitTrackerReducer from "./slice/habit-tracker";
import bookmarkReducer from "./slice/bookmark";
import noteReducer from "./slice/note";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

const r = [
  "bookmarks",
  "todo",
  "layout",
  "theme",
  "habitTracker",
  "note",
] as const;

export type reducers = (typeof r)[number];
export const reducerNames: reducers[] = [...r];

const getPersist = <T>(
  key: string,
  reducer: Reducer<T>,
  others?: Partial<PersistConfig<T>>
) => {
  const storageConfig: PersistConfig<T> = { key, storage, ...others };
  return persistReducer(storageConfig, reducer);
};

export const store = configureStore({
  reducer: {
    bookmarks: getPersist("bookmarks", bookmarkReducer),
    todo: getPersist("todo", todoReducer),
    layout: getPersist("layout", layoutReducer, { blacklist: ["lock"] }),
    theme: getPersist("theme", themeReducer),
    habitTracker: getPersist("habitTracker", habitTrackerReducer),
    note: getPersist("note", noteReducer),
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export const persistor = persistStore(store);
