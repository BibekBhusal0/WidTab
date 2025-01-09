import { treeNode, treeNodeArray } from "@/types/slice/bookmark";
import bookmark from "@/assets/bookmarks.json";
import { Layout } from "react-grid-layout";

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

export const deleteBookmark = (_: string) => {};

type layoutIndex = Layout & { index: number };
export const coors2index = (coors: Layout[], n_cols: number): layoutIndex[] => {
  return coors.map((coor) => {
    return { ...coor, index: coor.y * n_cols + coor.x };
  });
};
export const sortByIndex = (coors: layoutIndex[]) =>
  coors.sort((a, b) => a.index - b.index);

export const treeToLayout = (tree: treeNodeArray, n_cols: number): Layout[] =>
  tree.map((node, i) => {
    return { x: i % n_cols, y: Math.floor(i / n_cols), w: 1, h: 1, i: node.id };
  });

export const reorderFavorites = (
  favorites: Layout[],
  n_cols: number
): string[] => {
  return sortByIndex(coors2index(favorites, n_cols)).map((coor) => coor.i);
};
