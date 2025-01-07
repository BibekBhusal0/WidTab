import { reducerNames, reducers, store } from "@/redux/store";

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
