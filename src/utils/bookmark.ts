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
          } else {
            resolve(path);
          }
        } else {
          resolve(path);
        }
      });
    };

    getPathRecursive(id);
  });
};

export const deleteBookmark = (id: string) => browser.bookmarks.remove(id);

export const openLink = (
  url: string,
  newTab = false,
  event?: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  if (event) event.preventDefault();
  const linkInNewTab =
    newTab || event?.ctrlKey || event?.metaKey || event?.shiftKey;
  if (event?.shiftKey) {
    browser.windows.create({ url, type: "popup" });
    return;
  }
  browser.tabs.create({ url, active: !linkInNewTab });
};
