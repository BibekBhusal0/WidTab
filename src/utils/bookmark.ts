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
  const bookmarks = loadBookmarksFromJson();

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

export const deleteLink = (id: string) => {
  console.log({ id });
};
export const deleteFolder = (id: string) => {
  console.log({ id });
};
export const addFolder = (parentId: string, folderName: string) => {
  console.log({ parentId, folderName });
  alert(`${folderName} Added`);
};
export const addLink = (parentId: string, url: string, title: string) => {
  console.log({ parentId, url, title });
  alert(`${title} Added`);
};
export const editLink = (id: string, url: string, title: string) => {
  console.log({ id, url, title });
  alert(`${title} Edited`);
};
export const editFolder = (id: string, title: string) => {
  console.log({ id, title });
  alert(`${title} Edited`);
};

export const openLink = (
  url: string,
  newTab = false,
  event?: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  event?.preventDefault();
  const nt = newTab || event?.shiftKey || event?.metaKey || event?.ctrlKey;
  window.open(url, nt ? "_blank" : "_self");
};

export const reorderFavorites = (favorites: treeNodeArray): string[] => {
  return favorites.map((node) => node.id);
};
