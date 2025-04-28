import { reducerNames, reducers, store } from "@/redux/store";
import browser from "webextension-polyfill";

export const saveToLocalStorage = (key: string, data: any): Promise<void> => {
  return browser.storage.local.set({ [key]: data });
};

export const loadFromLocalStorage = (key: string): Promise<any | null> => {
  return browser.storage.local.get(key).then((data) => {
    return data[key] || null;
  });
};

export const setInitialStateFromLocalStorage = async () => {
  for (const key of reducerNames) {
    const data = await loadFromLocalStorage(key);
    if (!data) continue;
    store.dispatch({
      type: `${key}/setState`,
      payload: { value: data, check: false },
    });
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
      store.dispatch({
        type: `${k}/setState`,
        payload: { value: state, check: true },
      });
    }
  } catch (error) {
    console.error("Failed to import state:", error);
  }
};
