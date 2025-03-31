import { changeDockContentType, changeDockSelected, toggleDock } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { treeNodeOrArray } from "@/types/slice/bookmark";
import { useAllBookmarks } from "@/hooks/useBookmarks";
import { ReactNode } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { which } from "@/hooks/useAllSpaceAndIcon";

function DockSettings() {
  const { dock, dockContent } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();

  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => dispatch(toggleDock()),
      title: "Show Dock",
      checked: dock,
    },
  ];

  const onDockTypeChange = (_: React.MouseEvent<HTMLElement>, dockContentType: string | null) => {
    if (typeof dockContentType === "string") dispatch(changeDockContentType(dockContentType));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <MenuSwitch plain items={toggle} />
      {dock && (
        <>
          <div className="full-between gap-2">
            <div className="text-xl">Dock Content</div>
            <ToggleButtonGroup
              aria-label="Dock Content Type"
              value={dockContent.content}
              exclusive
              onChange={onDockTypeChange}>
              <ToggleButton size="small" value="spaces">
                Spaces
              </ToggleButton>
              <ToggleButton size="small" value="bookmark">
                Bookmark
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="full-between">
            <div className="text-xl capitalize">{dockContent.content}</div>
            {dockContent.content === "spaces" ? <DockSpaceSelect /> : <DockBookmarkSelect />}
          </div>
        </>
      )}
    </div>
  );
}

function DockBookmarkSelect() {
  const { dockContent } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();
  const { bookmarks } = useAllBookmarks();

  const handleSelectionChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value;
    if (val && typeof val === "string") {
      dispatch(changeDockSelected(val));
    }
  };
  const getBookmarkFolders = (bookmark: treeNodeOrArray): ReactNode[] => {
    if (Array.isArray(bookmark)) {
      return bookmark.flatMap((child) => getBookmarkFolders(child));
    }
    if (bookmark.children) {
      const items = [];
      if (bookmark.title && bookmark.title.trim() !== "") {
        items.push(
          <MenuItem key={bookmark.id} className="text-xl capitalize" value={bookmark.id}>
            {bookmark.title}
          </MenuItem>
        );
      }
      items.push(...bookmark.children.flatMap((child) => getBookmarkFolders(child)));
      return items;
    }
    return [];
  };

  return (
    <Select
      MenuProps={{ sx: { maxHeight: 300 } }}
      size="small"
      fullWidth
      value={dockContent.id}
      className="capitalize"
      onChange={handleSelectionChange}>
      <MenuItem value="favorites" className="text-xl capitalize">
        favorites
      </MenuItem>
      {getBookmarkFolders(bookmarks)}
    </Select>
  );
}

function DockSpaceSelect() {
  const { dockContent } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();

  const handleSelectionChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value;
    if (val && typeof val === "string") {
      dispatch(changeDockSelected(val));
    }
  };

  const spaceSelection: which[] = ["all", "dynamic", "static"];

  return (
    <Select
      MenuProps={{ sx: { maxHeight: 300 } }}
      fullWidth
      size="small"
      value={dockContent.id}
      className="capitalize"
      onChange={handleSelectionChange}>
      {spaceSelection.map((id) => (
        <MenuItem className="capitalize" key={id} value={id}>
          {id}
        </MenuItem>
      ))}
    </Select>
  );
}

export default DockSettings;
