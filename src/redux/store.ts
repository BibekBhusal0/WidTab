import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: { theme: themeReducer },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
