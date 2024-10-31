import { useEffect, useState } from "react";

function useBookmarksUpdate(callback: Function, dependencies: any[] = []) {
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
  }, dependencies);
}

export function useAllBookmarks(dependencies: any[] = []) {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const fetchBookmarks = () => {
    chrome.bookmarks
      .getTree()
      .then((data) => {
        if (Array.isArray(data)) setBookmarks(data);
        else setBookmarks([]);
      })
      .catch(() => setBookmarks([]));
  };
  useBookmarksUpdate(fetchBookmarks, dependencies);

  return { bookmarks, setBookmarks };
}

export default useBookmarksUpdate;
