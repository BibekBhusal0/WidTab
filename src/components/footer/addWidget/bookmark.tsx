import { useDispatch, useSelector } from "react-redux";
import useBookmarks from "@/hooks/useBookmarks";
import { ReactNode, useState } from "react";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import { widgetDimensions } from "@/utils/getWidget";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

function AddBookmark() {
  const layout = useCurrentLayout();
  const dimensions = widgetDimensions["bookmark"];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const fetchBookmarks = () => {
    chrome.bookmarks.getTree().then((data) => {
      setBookmarks(data);
    });
  };

  useBookmarks(fetchBookmarks);
  const dispatch = useDispatch();
  const addItem = (id: string) => {
    const i = parseInt(id);
    if (typeof i === "number" && availablePosition)
      dispatch(
        currentSpaceAddWidget({
          type: "bookmark",
          values: { id: i, iconSize: "small" },
          gridProps: { ...dimensions, ...availablePosition },
        })
      );
  };
  if (!layout) return null;
  const { widgets } = layout;
  const presentBookmark = widgets.filter(({ type }) => type === "bookmark");
  const presentBookmarkId = presentBookmark.map(
    ({ values: { id } }) => `${id}`
  );

  const getBookmarksFolder = (
    bookmark:
      | chrome.bookmarks.BookmarkTreeNode[]
      | chrome.bookmarks.BookmarkTreeNode
  ): ReactNode => {
    if (Array.isArray(bookmark)) {
      return (
        <List className="pl-2">
          {bookmarks.map((child) => getBookmarksFolder(child))}
        </List>
      );
    }
    if (bookmark.children) {
      return (
        <ListItemButton
          className="text-xl"
          disabled={presentBookmarkId.includes(bookmark.id)}
          onClick={() => {
            addItem(bookmark.id);
          }}>
          {bookmark.title}
        </ListItemButton>
      );
    }
    return null;
  };
  return <>{getBookmarksFolder(bookmarks)}</>;
}

export default AddBookmark;
