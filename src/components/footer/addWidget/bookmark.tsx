import { useDispatch, useSelector } from "react-redux";
import { treeNodeOrArray } from "@/types/slice/bookmark";
import { useAllBookmarks } from "@/hooks/useBookmarks";
import { Fragment, ReactNode } from "react";
import { widgetDimensions } from "@/utils/getWidget";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import SimpleAddWidgetButton from "./simpleAddWidget";
import { ScrollArea } from "@/components/scrollarea";
import { Icon } from "@iconify/react";
import useAddWidget from "@/hooks/useAddWidget";
import Button from "@mui/material/Button";
import browser from "webextension-polyfill";
import { StateType } from "@/redux/store";
import { Icon2RN } from "@/theme/icons";

function AddBookmark() {
  const dimensions = widgetDimensions["bookmark"];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);
  const { folderIcons } = useSelector((state: StateType) => state.bookmarks);
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
      return bookmarks.map((child, i) => (
        <Fragment key={i}> {getBookmarkFolders(child)} </Fragment>
      ));
    }
    if (bookmark.children) {
      return (
        <>
          {bookmark.title && bookmark.title.trim() !== "" && (
            <MenuItem
              key={bookmark.id}
              disabled={!availablePosition}
              onClick={() => addItem(bookmark.id)}>
              <ListItemIcon>
                <Icon2RN icon={folderIcons?.[bookmark.id]} />
              </ListItemIcon>
              <div className="text-xl truncate">{bookmark.title}</div>
            </MenuItem>
          )}
          {bookmark.children.map((child: treeNodeOrArray, i) => (
            <Fragment key={i}>{getBookmarkFolders(child)} </Fragment>
          ))}
        </>
      );
    }
    return null;
  };
  return (
    <div className="w-full h-[330px] relative">
      <ScrollArea className="w-full h-[80%]">
        {getBookmarkFolders(bookmarks)}
      </ScrollArea>
      <div className="p-2 h-[10%] bottom-2 horizontal-center w-full flex-center gap-4">
        <SimpleAddWidgetButton
          widget={{ type: "favorites", values: { id: 0 } }}
          buttonProps={{
            children: "Add Favorites",
            startIcon: <Icon icon="mdi:heart" />,
          }}
        />
        <AddTopSites />
      </div>
    </div>
  );
}

export const AddTopSites = () => {
  const { add, availablePosition } = useAddWidget({
    type: "top-sites",
    values: { id: 0 },
  });
  const addWidget = async () => {
    const hasPermission = await browser.permissions.contains({
      permissions: ["topSites"],
    });
    if (hasPermission) add();
    else {
      const res = await browser.permissions.request({
        permissions: ["topSites"],
      });
      if (res) add();
    }
  };

  return (
    <Button
      variant="contained"
      onClick={addWidget}
      disabled={!availablePosition}
      startIcon={<Icon icon="mdi:web-plus" />}>
      Add Top Sites
    </Button>
  );
};

export default AddBookmark;
