export const findPath = (id: string) => {
  return new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve) => {
    const path: chrome.bookmarks.BookmarkTreeNode[] = [];

    const getPathRecursive = (nodeId: string) => {
      chrome.bookmarks.get(nodeId, (nodes) => {
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
