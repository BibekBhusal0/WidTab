import React, { useState } from "react";
import { store } from "@/redux/store";

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

    Object.keys(importedState).forEach((key) => {
      if (
        ![
          "bookmarks",
          "todo",
          "theme",
          "layout",
          "habitTracker",
          "note",
        ].includes(key)
      )
        return;
      const action = { type: `${key}/setState`, payload: importedState[key] };
      store.dispatch(action);
    });
  } catch (error) {
    console.error("Failed to import state:", error);
  }
};
