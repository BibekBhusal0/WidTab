import {
  allStorageKeys,
  getFromStorage,
  STORAGE_KEYS,
  StorageKeys,
} from "@/storage";
import { setBookmarkState } from "@/storage/bookmark";
import { setTrackerState } from "@/storage/habit-tracker";
import { setLayoutState } from "@/storage/layout";
import { setNoteState } from "@/storage/note";
import { setThemeState } from "@/storage/theme";
import { setTodoState } from "@/storage/todo";

export const exportStateToJSON = async () => {
  const state: any = {};
  for (const key in STORAGE_KEYS) {
    const s = await getFromStorage(
      STORAGE_KEYS[key as keyof typeof STORAGE_KEYS]
    );
    if (s) state[key] = s;
  }
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
      const k = key as StorageKeys;
      if (!allStorageKeys.includes(k)) continue;
      const state = importedState[k];
      switch (k) {
        case "note":
          setNoteState(state);
          break;
        case "todo":
          setTodoState(state);
          break;
        case "bookmark":
          setBookmarkState(state);
          break;
        case "habitTracker":
          setTrackerState(state);
          break;
        case "layout":
          setLayoutState(state);
          break;
        case "theme":
          setThemeState(state);
          break;
      }
    }
  } catch (error) {
    console.error("Failed to import state:", error);
  }
};
