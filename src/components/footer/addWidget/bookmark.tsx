import { useDispatch } from "react-redux";
import { treeNodeOrArray } from "@/types/slice/bookmark";
import { useAllBookmarks } from "@/hooks/useBookmarks";
import { ReactNode } from "react";
import { widgetDimensions } from "@/utils/getWidget";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SimpleAddWidgetButton from "./simpleAddWidget";
import { ScrollArea } from "@/components/scrollarea";
import { Icon } from "@iconify/react";

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

  const getBookmarkFolders = (bookmark: treeNodeOrArray): ReactNode => {
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
          {bookmark.children.map((child: treeNodeOrArray) =>
            getBookmarkFolders(child)
          )}
        </>
      );
    }
    return null;
  };
  return (
    <div className="w-full h-[330px] relative">
      <ScrollArea className="w-full h-[80%]">
        <List>{getBookmarkFolders(bookmarks)}</List>
      </ScrollArea>
      <div className="p-2 h-[10%] bottom-2 horizontal-center w-full flex-center gap-4">
        <SimpleAddWidgetButton
          widget={{ type: "favorites", values: { id: 0 } }}
          buttonProps={{
            children: "Add Favorites",
            startIcon: <Icon icon="mdi:heart" />,
          }}
        />
      </div>
    </div>
  );
}

export default AddBookmark;
