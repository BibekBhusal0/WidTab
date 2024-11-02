const s = ["small", "medium", "large"] as const;
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

export interface TakeBookmarksProps {
  bookmarks:
    | chrome.bookmarks.BookmarkTreeNode[]
    | chrome.bookmarks.BookmarkTreeNode;
}

export interface BookmarkTree {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
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
