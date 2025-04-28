import { treeNodeArray } from "@/types/slice/bookmark";
import React from "react";
import browser from "webextension-polyfill";

export const findPath = (id: string) => {
  return new Promise<treeNodeArray>((resolve) => {
    const path: treeNodeArray = [];

    const getPathRecursive = (nodeId: string) => {
      browser.bookmarks.get(nodeId).then((nodes) => {
        if (nodes.length > 0) {
          const node = nodes[0];
          path.unshift(node);
          if (node.parentId) {
            getPathRecursive(node.parentId);
          } else resolve(path);
        } else resolve(path);
      });
    };

    getPathRecursive(id);
  });
};

export const deleteLink = (id: string) => browser.bookmarks.remove(id);
export const deleteFolder = (id: string) => browser.bookmarks.removeTree(id);
export const addFolder = (parentId: string, folderName: string) =>
  browser.bookmarks.create({ parentId, title: folderName });
export const addLink = (parentId: string, url: string, title: string) =>
  browser.bookmarks.create({ parentId, url, title });
export const editLink = (id: string, url: string, title: string) =>
  browser.bookmarks.update(id, { url, title });
export const editFolder = (id: string, title: string) => browser.bookmarks.update(id, { title });

export const openLink = (
  url: string,
  newTab = false,
  event?: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  event?.preventDefault();
  if (event?.shiftKey) browser.windows.create({ url, type: "normal" });
  else if (event?.metaKey || event?.ctrlKey) browser.tabs.create({ url, active: false });
  else if (newTab) browser.tabs.create({ url, active: true });
  else browser.tabs.update({ url });
};

export const reorderFavorites = (favorites: treeNodeArray): string[] => {
  return favorites.map((node) => node.id);
};

export const reorderBookmarks = (bookmarks: treeNodeArray) => {
  bookmarks.forEach((node, index) => {
    browser.bookmarks.move(node.id, { index, parentId: node.parentId });
  });
};
