export function findBookmark(
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  id: string
): chrome.bookmarks.BookmarkTreeNode | undefined {
  for (const bookmark of bookmarks) {
    if (bookmark.id === id) {
      return bookmark;
    }
    if (Array.isArray(bookmark.children)) {
      const found = findBookmark(bookmark.children, id);
      if (found) {
        return found;
      }
    }
  }
}

const getPathRoot = (
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  id: string
) => {
  const path: chrome.bookmarks.BookmarkTreeNode[] = [];
  const currentFolder = findBookmark(bookmarks, id);
  if (!currentFolder) return path;
  path.push(currentFolder);
  const parentID = currentFolder.parentId;
  if (!parentID) return path;
  const parent = findBookmark(bookmarks, parentID);
  if (parent) {
    const parentPath = getPathRoot(bookmarks, parentID);
    path.push(...parentPath);
  }
  return path;
};

export const findPath = (
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  id: string
) => {
  const path = getPathRoot(bookmarks, id).reverse();
  path.shift();
  return path || [];
};
