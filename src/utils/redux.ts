import { setBookmarkState } from "@/redux/slice/bookmark";
import { setTrackerState } from "@/redux/slice/habit-tracker";
import { setLayoutState } from "@/redux/slice/layout";
import { setNoteState } from "@/redux/slice/note";
import { setThemeState } from "@/redux/slice/theme";
import { setTodoState } from "@/redux/slice/todo";
import { reducerNames, reducers, store } from "@/redux/store";

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
      switch (k) {
        case "note":
          store.dispatch(setNoteState(state));
          break;
        case "todo":
          store.dispatch(setTodoState(state));
          break;
        case "bookmarks":
          store.dispatch(setBookmarkState(state));
          break;
        case "habitTracker":
          store.dispatch(setTrackerState(state));
          break;
        case "layout":
          store.dispatch(setLayoutState(state));
          break;
        case "theme":
          store.dispatch(setThemeState(state));
      }
    }
  } catch (error) {
    console.error("Failed to import state:", error);
  }
};
