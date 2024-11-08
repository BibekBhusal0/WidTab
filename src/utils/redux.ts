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
      if (!reducerNames.includes(key as reducers)) continue;
      console.log("Dispatching setState for:", key);
      const type = `${key}/setState`;
      const payload = importedState[key];
      store.dispatch({ type, payload });
    }
  } catch (error) {
    console.error("Failed to import state:", error);
  }
};
