import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { useDeferredValue, useEffect, useState } from "react";
import { treeNodeArray } from "@/types/slice/bookmark";
import { findBookmarkById, loadBookmarksFromJson } from "@/utils/bookmark";

export function useAllBookmarks(dependencies: any[] = []) {
  const [bookmarks, setBookmarks] = useState<treeNodeArray>([]);

  const fetchBookmarks = async () => {
    try {
      const data = await loadBookmarksFromJson();
      setBookmarks(data);
    } catch {
      setBookmarks([]);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, dependencies);

  return { bookmarks, setBookmarks };
}

export const useFavoriteBookmarks = (dependencies: any[] = []) => {
  const { favorites } = useSelector((state: StateType) => state.bookmarks);
  const [favoriteBookmarks, setFavoriteBookmarks] = useState<treeNodeArray>([]);

  const getBookmarks = async () => {
    try {
      const bookmarks = await loadBookmarksFromJson();
      const favoriteBookmarks = favorites
        .map((id) => findBookmarkById(bookmarks, id))
        .filter(Boolean) as treeNodeArray;
      setFavoriteBookmarks(favoriteBookmarks);
    } catch {
      setFavoriteBookmarks([]);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, [favorites, ...dependencies]);

  return favoriteBookmarks;
};

export const useBookmarkFolder = (
  folderID: string,
  dependencies: any[] = []
) => {
  const [bookmark, setBookmark] = useState<treeNodeArray>([]);

  const getBookmarks = async () => {
    try {
      const data = await loadBookmarksFromJson();
      const folder = findBookmarkById(data, folderID);
      setBookmark(folder ? folder.children || [] : []);
    } catch {
      setBookmark([]);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, [folderID, ...dependencies]);

  return bookmark;
};
export function useBookmarkSearch(searchTerm: string) {
  const [searchedBookmarks, setSearchedBookmarks] = useState<treeNodeArray>([]);
  const deferredSearchTerm = useDeferredValue(searchTerm.toLowerCase());

  useEffect(() => {
    const searchBookmarks = async () => {
      if (deferredSearchTerm.trim() === "") setSearchedBookmarks([]);
      else {
        try {
          const bookmarks = await loadBookmarksFromJson();
          const results: treeNodeArray = [];

          const searchInBookmarks = (bookmarks: treeNodeArray) => {
            for (const bookmark of bookmarks) {
              if (
                bookmark.title
                  .toLocaleLowerCase()
                  .includes(deferredSearchTerm) &&
                bookmark.url?.toLowerCase()?.includes(deferredSearchTerm)
              ) {
                results.push(bookmark);
              }
              if (bookmark.children) {
                searchInBookmarks(bookmark.children);
              }
            }
          };

          searchInBookmarks(bookmarks);
          setSearchedBookmarks(results);
        } catch {
          setSearchedBookmarks([]);
        }
      }
    };

    searchBookmarks();
  }, [deferredSearchTerm]);

  return searchedBookmarks;
}

export function useBookmarkSiblings(folderId: string) {
  const [bookmark, setBookmark] = useState<treeNodeArray>([]);

  const getBookmarks = async () => {
    try {
      const data = await loadBookmarksFromJson();
      const folder = findBookmarkById(data, folderId);
      if (folder && folder.parentId) {
        const parentFolder = findBookmarkById(data, folder.parentId);
        if (parentFolder && parentFolder.children) {
          setBookmark(parentFolder.children.filter((b) => !b.url));
        }
      }
    } catch {
      setBookmark([]);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, [folderId]);

  return bookmark;
}
