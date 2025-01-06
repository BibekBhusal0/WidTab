import { setBookmarkState } from "@/redux/slice/bookmark";
import { setTrackerState } from "@/redux/slice/habit-tracker";
import { setLayoutState } from "@/redux/slice/layout";
import { setNoteState } from "@/redux/slice/note";
import { setThemeState } from "@/redux/slice/theme";
import { setTodoState } from "@/redux/slice/todo";
import { reducerNames, reducers, store } from "@/redux/store";

export const actionMap: Record<reducers, (state: any) => any> = {
  note: setNoteState,
  todo: setTodoState,
  bookmarks: setBookmarkState,
  habitTracker: setTrackerState,
  layout: setLayoutState,
  theme: setThemeState,
};

export const saveToLocalStorage = (key: string, data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const loadFromLocalStorage = (key: string): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    try {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : null);
    } catch (error) {
      reject(error);
    }
  });
};

export const setInitialStateFromLocalStorage = async () => {
  for (const key in actionMap) {
    const k = key as reducers;
    if (!reducerNames.includes(k)) continue;
    const data = await loadFromLocalStorage(key);
    if (data) store.dispatch(actionMap[k]({ value: data, check: false }));
  }
};

export const exportStateToJSON = () => {
  const state = store.getState();
  const stateJSON = JSON.stringify(state);
  const blob = new Blob([stateJSON], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "backup.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importStateFromJSON = async (file: File) => {
  try {
    const text = await file.text();
    const importedState = JSON.parse(text);

    for (const key in importedState) {
      const k = key as reducers;
      if (!reducerNames.includes(k)) continue;

      const state = importedState[k];
      const actionCreator = actionMap[k];

      if (actionCreator) {
        store.dispatch(actionCreator({ value: state, check: true }));
      }
    }
  } catch (error) {
    console.error("Failed to import state:", error);
  }
};
