import browser from "webextension-polyfill";
const s = ["small", "medium", "large"] as const;
export type folderSizes = (typeof s)[number];
export const allFolderSizes: folderSizes[] = [...s];

export type bookmarkStateType = {
  favorites: string[];

  currentFolderID: string;
  linkInNewTab: boolean;

  showFavorites: boolean;
  folderSize: folderSizes;
};

export type FavoritesWidgetType = {
  id: number;
  iconSize?: folderSizes;
};

export type BookmarkWidgetType = {
  id: number;
  folderId: string;
  iconSize: folderSizes;
  tabs?: boolean;
  breadcrumb?: boolean;
};

export type treeNode = browser.Bookmarks.BookmarkTreeNode;
export type bookmarkTreeNode = { bookmarks: treeNode };
export type treeNodeArray = treeNode[];
export type bookmarkTreeNodeArray = { bookmarks: treeNode[] };
export type treeNodeOrArray = treeNode | treeNodeArray;

export interface TakeBookmarksProps {
  bookmarks: treeNodeOrArray;
}

export type ExtraBookmarkProps = {
  folderSize?: folderSizes;
  onFolderChange?: (id: string) => any;
};

export const folderSizeMapping: Record<folderSizes, number> = {
  small: 80,
  medium: 120,
  large: 150,
};
