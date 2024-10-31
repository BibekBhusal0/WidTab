import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/theme";
import todoReducer from "./slice/todo";
import layoutReducer from "./slice/layout";
import habitTrackerReducer from "./slice/habit-tracker";
import bookmarkReducer from "./slice/bookmark";
import { persistStore, persistReducer } from "redux-persist";
import { localStorage } from "redux-persist-webextension-storage";

const localStorageConfig = { key: "storage", storage: localStorage };

export const store = configureStore({
  reducer: {
    bookmarks: persistReducer(localStorageConfig, bookmarkReducer),
    todo: persistReducer(localStorageConfig, todoReducer),
    layout: persistReducer(localStorageConfig, layoutReducer),
    theme: persistReducer(localStorageConfig, themeReducer),
    habitTracker: persistReducer(localStorageConfig, habitTrackerReducer),
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export const persistor = persistStore(store);
