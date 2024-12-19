import { treeNodeArray } from "@/types/slice/bookmark";
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
