import { useEffect } from "react";

function useBookmarks(callback: Function) {
  useEffect(() => {
    callback();

    const listeners = [
      chrome.bookmarks.onCreated,
      chrome.bookmarks.onChanged,
      chrome.bookmarks.onRemoved,
    ];

    listeners.map((event) => event.addListener(() => callback()));

    return () => {
      listeners.map((event) => event.removeListener(() => callback()));
    };
  }, []);
}

export default useBookmarks;
