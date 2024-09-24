import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/theme";
import todoReducer from "./slice/todo";
import layoutReducer from "./slice/layout";

export const store = configureStore({
  reducer: { theme: themeReducer, todo: todoReducer, layout: layoutReducer },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
