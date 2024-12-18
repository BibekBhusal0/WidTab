import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { useEffect, useState } from "react";
import { treeNode, treeNodeArray } from "@/types/slice/bookmark";
import browser from "webextension-polyfill";

function useBookmarksUpdate(callback: Function, dependencies: any[] = []) {
  useEffect(() => {
    callback();

    const listeners = [
      browser.bookmarks.onCreated,
      browser.bookmarks.onChanged,
      browser.bookmarks.onRemoved,
    ];

    listeners.map((event) => event.addListener(() => callback()));

    return () => {
      listeners.map((event) => event.removeListener(() => callback()));
    };
  }, dependencies);
}

export function useAllBookmarks(dependencies: any[] = []) {
  const [bookmarks, setBookmarks] = useState<treeNodeArray>([]);

  const fetchBookmarks = () => {
    browser.bookmarks
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

  const [bookmark, setBookmark] = useState<treeNodeArray>([]);
  const getBookmarks = () => {
    const bookmarkPromises = favorites.map((id) => browser.bookmarks.get(id));

    Promise.all(bookmarkPromises).then((results) => {
      const bookmarks = results
        .flat()
        .filter((bookmark): bookmark is treeNode => !!bookmark);

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
  const [bookmark, setBookmark] = useState<treeNodeArray>([]);
  const getBookmarks = () => {
    browser.bookmarks.getSubTree(folderID).then((data) => {
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
