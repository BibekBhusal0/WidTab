import { configureStore, Reducer } from "@reduxjs/toolkit";
import themeReducer from "./slice/theme";
import todoReducer from "./slice/todo";
import layoutReducer from "./slice/layout";
import habitTrackerReducer from "./slice/habit-tracker";
import bookmarkReducer from "./slice/bookmark";
import { persistStore, persistReducer } from "redux-persist";
import { localStorage } from "redux-persist-webextension-storage";

const getPersist = <T>(key: string, reducer: Reducer<T>) => {
  const storageConfig = { key, storage: localStorage };
  return persistReducer(storageConfig, reducer);
};

export const store = configureStore({
  reducer: {
    bookmarks: getPersist("bookmarks", bookmarkReducer),
    todo: getPersist("todo", todoReducer),
    layout: getPersist("layout", layoutReducer),
    theme: getPersist("theme", themeReducer),
    habitTracker: getPersist("habitTracker", habitTrackerReducer),
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export const persistor = persistStore(store);
