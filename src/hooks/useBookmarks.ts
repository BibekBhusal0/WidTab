import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
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

export const useFavoriteBookmarks = (dependencies: any[] = []) => {
  const { favorites } = useSelector((state: StateType) => state.bookmarks);

  const [bookmark, setBookmark] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );
  const getBookmarks = () => {
    const bookmarkPromises = favorites.map((id) => chrome.bookmarks.get(id));

    Promise.all(bookmarkPromises).then((results) => {
      const bookmarks = results
        .flat()
        .filter(
          (bookmark): bookmark is chrome.bookmarks.BookmarkTreeNode =>
            !!bookmark
        );

      setBookmark(bookmarks);
    });
  };
  useBookmarksUpdate(getBookmarks, [favorites, ...dependencies]);
  return bookmark;
};

export const useBookmarkFolder = (
  folderID: string,
  dependencies: any[] = []
) => {
  const [bookmark, setBookmark] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );
  const getBookmarks = () => {
    chrome.bookmarks.getSubTree(folderID, (data) => {
      setBookmark(
        Array.isArray(data)
          ? data[0] && data[0].children
            ? data[0].children
            : data
          : []
      );
    });
  };
  useBookmarksUpdate(getBookmarks, [folderID, ...dependencies]);

  return bookmark;
};
