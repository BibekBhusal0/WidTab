import { treeNode, treeNodeArray } from "@/types/slice/bookmark";
import bookmark from "@/assets/bookmarks.json";

export const loadBookmarksFromJson = () => bookmark as treeNodeArray;

export const findBookmarkById = (
  bookmarks: treeNodeArray,
  id: string
): treeNode | null => {
  for (const bookmark of bookmarks) {
    if (bookmark.id === id) return bookmark;

    if (bookmark.children) {
      const found = findBookmarkById(bookmark.children, id);
      if (found) return found;
    }
  }
  return null; // Not found
};

export const findPath = async (id: string): Promise<treeNodeArray> => {
  const path: treeNodeArray = [];
  const bookmarks = await loadBookmarksFromJson();

  const getPathRecursive = (nodeId: string) => {
    const node = findBookmarkById(bookmarks, nodeId);
    if (node) {
      path.unshift(node);
      if (node.parentId) {
        getPathRecursive(node.parentId);
      }
    }
  };

  getPathRecursive(id);
  return path;
};

export const deleteBookmark = (id: string) => {};
