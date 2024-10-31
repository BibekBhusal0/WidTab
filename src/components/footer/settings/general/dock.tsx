import {
  changeDockContentType,
  changeDockSelected,
  toggleDock,
} from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAllBookmarks } from "@/hooks/useBookmarks";
import { ReactNode } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { which } from "@/hooks/useAllSpaceAndIcon";

function DockSettings() {
  const { dock, dockContent } = useSelector((state: StateType) => state.layout);
  console.log(dockContent);
  const dispatch = useDispatch();
  const { bookmarks } = useAllBookmarks();
  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => dispatch(toggleDock()),
      title: "Show Dock",
      checked: dock,
    },
  ];

  const onDockTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    dockContentType: string | null
  ) => {
    if (typeof dockContentType === "string")
      dispatch(changeDockContentType(dockContentType));
  };

  const handleSelectionChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value;
    if (val && typeof val === "string") {
      console.log(val);
      dispatch(changeDockSelected(val));
    }
  };

  const getBookmarkFolders = (
    bookmark:
      | chrome.bookmarks.BookmarkTreeNode[]
      | chrome.bookmarks.BookmarkTreeNode
  ): ReactNode => {
    if (Array.isArray(bookmark)) {
      return bookmark.map((child) => getBookmarkFolders(child));
    }
    if (bookmark.children) {
      //   console.log(bookmark.id, bookmark.title);
      return (
        <>
          {bookmark.title && bookmark.title.trim() !== "" && (
            <MenuItem className="text-xl capitalize" value={bookmark.id}>
              {bookmark.title}
            </MenuItem>
          )}
          {bookmark.children.map((child) => getBookmarkFolders(child))}
        </>
      );
    }
    return null;
  };

  const spaceSelection: which[] = ["all", "dynamic", "static"];

  return (
    <div className="w-full flex flex-col gap-4">
      <MenuSwitch plain items={toggle} />
      {dock && (
        <>
          <div className="flex-center flex-col gap-2">
            <div className="text-xl">Dock Content</div>
            <ToggleButtonGroup
              value={dockContent.content}
              exclusive
              onChange={onDockTypeChange}
              aria-label="Dock Content Type">
              <ToggleButton value="spaces"> Spaces </ToggleButton>
              <ToggleButton value="bookmark"> Bookmark</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="full-between">
            <div className="text-xl capitalize">{dockContent.content}</div>
            <Select
              // MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
              MenuProps={{ sx: { maxHeight: 300 } }}
              fullWidth
              value={dockContent.id}
              className="capitalize"
              onChange={handleSelectionChange}>
              {dockContent.content === "spaces"
                ? spaceSelection.map((id) => (
                    <MenuItem className="capitalize" key={id} value={id}>
                      {id}
                    </MenuItem>
                  ))
                : getBookmarkFolders(bookmarks)}
            </Select>
          </div>
        </>
      )}
    </div>
  );
}

export default DockSettings;
