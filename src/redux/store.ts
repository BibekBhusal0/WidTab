import { configureStore, Middleware } from "@reduxjs/toolkit";
import themeReducer from "./slice/theme";
import todoReducer from "./slice/todo";
import layoutReducer from "./slice/layout";
import habitTrackerReducer from "./slice/habit-tracker";
import bookmarkReducer from "./slice/bookmark";
import noteReducer from "./slice/note";
import { saveToLocalStorage } from "@/utils/redux";

export const middleware: Middleware = (store) => (next) => (action: any) => {
  const val = next(action);
  const s = action.type.split("/")[0] as reducers;
  if (reducerNames.includes(s)) {
    saveToLocalStorage(s, store.getState()[s]);
  }
  return val;
};
const r = ["bookmarks", "todo", "layout", "theme", "habitTracker", "note"] as const;
export type reducers = (typeof r)[number];
export const reducerNames: reducers[] = [...r];

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    todo: todoReducer,
    layout: layoutReducer,
    theme: themeReducer,
    habitTracker: habitTrackerReducer,
    note: noteReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(middleware);
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
