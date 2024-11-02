import { useDispatch } from "react-redux";
import { useAllBookmarks } from "@/hooks/useBookmarks";
import { ReactNode } from "react";
import { widgetDimensions } from "@/utils/getWidget";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SimpleAddWidgetButton from "./simpleAddWidget";

function AddBookmark() {
  const dimensions = widgetDimensions["bookmark"];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);
  const { bookmarks } = useAllBookmarks();

  const dispatch = useDispatch();
  const addItem = (id: string) => {
    if (availablePosition) {
      dispatch(
        currentSpaceAddWidget({
          type: "bookmark",
          values: { id: 0, iconSize: "small", folderId: id },
          gridProps: { ...dimensions, ...availablePosition },
        })
      );
    }
  };

  const getBookmarkFolders = (
    bookmark:
      | chrome.bookmarks.BookmarkTreeNode[]
      | chrome.bookmarks.BookmarkTreeNode
  ): ReactNode => {
    if (Array.isArray(bookmark)) {
      return bookmarks.map((child) => getBookmarkFolders(child));
    }
    if (bookmark.children) {
      return (
        <>
          {bookmark.title && bookmark.title.trim() !== "" && (
            <ListItemButton
              className="text-xl"
              onClick={() => addItem(bookmark.id)}>
              {bookmark.title}
            </ListItemButton>
          )}
          {bookmark.children.map((child) => getBookmarkFolders(child))}
        </>
      );
    }
    return null;
  };
  return (
    <>
      <List>{getBookmarkFolders(bookmarks)}</List>
      <SimpleAddWidgetButton
        widget={{ type: "favorites", values: { id: 0 } }}
        buttonProps={{ children: "Add Favorite Bookmarks Widget" }}
      />
    </>
  );
}

export default AddBookmark;
