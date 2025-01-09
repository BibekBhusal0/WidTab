const s = ["small", "medium", "large"] as const;
import { Layout } from "react-grid-layout";

export type folderSizes = (typeof s)[number];
export const allFolderSizes: folderSizes[] = [...s];

export type bookmarkSliceType = {
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

export type treeNode = chrome.bookmarks.BookmarkTreeNode;
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
  onReorder?: (layout: Layout[], n_cols: number) => any;
};

export const folderSizeMapping: Record<folderSizes, number> = {
  small: 80,
  medium: 120,
  large: 150,
};
