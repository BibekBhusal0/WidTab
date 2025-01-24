import Sidebar from "@/components/sidebar";
import BookmarkTree from "@/components/bookmarks/tree";
import SelectSize from "@/components/bookmarks/size";
import Button, { ButtonProps } from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { toggleShowFavorites } from "@/redux/slice/bookmark";
import BookmarkSearch from "@/components/bookmarks/search";
import { useBookmarkFolder } from "@/hooks/useBookmarks";
import BookmarkBreadcrumb from "@/components/bookmarks/breadcrumb";
import BookmarkGrid from "@/components/bookmarks/grid";
import { changeCurrentFolder } from "@/redux/slice/bookmark";
import { changeFolderSize } from "@/redux/slice/bookmark";
import {
  allFolderSizes,
  bookmarkTreeNodeArray,
  folderSizes,
} from "@/types/slice/bookmark";
import { ScrollArea } from "@/components/scrollarea";
import Favorites from "../widgets/favorites";
import MenuPopover, { MenuPopoverProps } from "@/components/popoverMenu";
import TextField from "@mui/material/TextField";
import { ReactNode, useState } from "react";
import { addFolder, addLink } from "@/utils/bookmark";
import { isValidUrl } from "novel/utils";

function BookmarkManager() {
  return (
    <Sidebar
      showButton
      resizableBoxProps={{
        children: (
          <ScrollArea className="h-full bg-primary-1">
            <BookmarkButtons />
            <BookmarkTree />
          </ScrollArea>
        ),
      }}
      headerProps={{ className: "h-20" }}
      header={
        <>
          <BookmarkSearch />
          <BookmarkSizeSelect />
        </>
      }
      containerProps={{ className: "size-full h-full" }}
      contentContainerProps={{ className: "h-full gap-0 pl-4" }}
      children={<MainBookmarks />}
    />
  );
}

function BookmarkSizeSelect() {
  const { folderSize } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value as folderSizes;
    if (allFolderSizes.includes(val)) {
      dispatch(changeFolderSize(val));
    }
  };
  return (
    <SelectSize
      sx={{ width: "150px" }}
      value={folderSize}
      onChange={handleChange}
    />
  );
}

const addIcon = <Icon icon="material-symbols:add-rounded" />;
function BookmarkButtons() {
  const gap = 10;
  const btnW = 90;
  const width = `calc(${btnW / 2}% - ${gap / 2}px)`;

  const getMenuProps = (c: ReactNode): Partial<MenuPopoverProps> => {
    return {
      icon: (
        <Button
          children={c}
          startIcon={addIcon}
          sx={{ width: "100%" }}
          variant="contained"
        />
      ),
      buttonProps: { sx: { width } },
      button: false,
      menuProps: {
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
        transformOrigin: { horizontal: "center", vertical: "top" },
        sx: { marginTop: "5px" },
      },
    };
  };
  const { showFavorites } = useSelector((state: StateType) => state.bookmarks);

  return (
    <div style={{ gap }} className="flex-center w-full my-3 flex-wrap">
      <FavButton sx={{ width: `${btnW}%` }} />
      {!showFavorites && (
        <>
          <AddFolderButton {...getMenuProps("Folder")} />
          <AddLinkButton {...getMenuProps("Link")} />
        </>
      )}
    </div>
  );
}

function AddFolderButton(props: Partial<MenuPopoverProps>) {
  const { currentFolderID } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const [key, setKey] = useState(1);
  const [name, setName] = useState("");
  const [helperText, setHelperText] = useState("");
  const handleClose = () => {
    setKey((prev) => prev + 1);
    setName("");
    setHelperText("");
  };
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
    if (helperText) setHelperText("");
  };
  const handleClick = () => {
    if (name.trim().length === 0) {
      setHelperText("Name is required");
      return;
    }
    addFolder(currentFolderID, name);
    handleClose();
  };
  return (
    <MenuPopover key={key} icon={<>Add Folder </>} button={false} {...props}>
      <div className="px-5 py-3 gap-3 flex-center flex-col">
        <TextField
          autoFocus
          size="small"
          error={!!helperText}
          label="Name"
          value={name}
          onChange={handleTextChange}
          helperText={helperText}
        />
        <Button onClick={handleClick} startIcon={addIcon} variant="contained">
          Add Folder
        </Button>
      </div>
    </MenuPopover>
  );
}
function AddLinkButton(props: Partial<MenuPopoverProps>) {
  const { currentFolderID } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const [key, setKey] = useState(1);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [urlHelperText, setUrlHelperText] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");

  const handleClose = () => {
    setKey((prev) => prev + 1);
    if (name) setName("");
    if (url) setUrl("");
    if (nameHelperText) setNameHelperText("");
    if (urlHelperText) setUrlHelperText("");
  };
  const handleUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUrl(e.target.value);
    if (urlHelperText) setUrlHelperText("");
  };
  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
    if (nameHelperText) setNameHelperText("");
  };

  const handleClick = () => {
    if (name.trim().length === 0) {
      setNameHelperText("Name is required");
      return;
    }
    if (url.trim().length === 0) {
      setUrlHelperText("Url is required");
      return;
    }
    if (!isValidUrl(url)) {
      setUrlHelperText("Invalid Url");
      return;
    }
    addLink(currentFolderID, url, name);
    handleClose();
  };

  return (
    <MenuPopover key={key} icon={<>Add Link </>} button={false} {...props}>
      <div className="px-5 py-3 gap-3 flex-center flex-col">
        <TextField
          autoFocus
          size="small"
          error={!!nameHelperText}
          label="Title"
          value={name}
          onChange={handleNameChange}
          helperText={nameHelperText}
        />
        <TextField
          size="small"
          error={!!urlHelperText}
          label="URL"
          value={url}
          onChange={handleUrlChange}
          helperText={urlHelperText}
        />
        <Button onClick={handleClick} startIcon={addIcon} variant="contained">
          Add Link
        </Button>
      </div>
    </MenuPopover>
  );
}

function FavButton(props: ButtonProps) {
  const dispatch = useDispatch();
  const { showFavorites } = useSelector((state: StateType) => state.bookmarks);

  return (
    <Button
      variant={showFavorites ? "outlined" : "contained"}
      startIcon={<Icon icon="mdi:heart-outline" />}
      children={`${showFavorites ? "Hide " : "Show "} All Favorites`}
      {...props}
      onClick={() => dispatch(toggleShowFavorites())}
    />
  );
}

function MainBookmarks() {
  const { currentFolderID, showFavorites, folderSize } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => dispatch(changeCurrentFolder(id));
  const props = { currentFolderID, onFolderChange };

  return (
    <>
      <div className="p-4">
        {showFavorites ? "Favorites" : <BookmarkBreadcrumb {...props} />}
      </div>
      {showFavorites ? (
        <Favorites {...props} id={1} iconSize={folderSize} />
      ) : (
        <ScrollArea>
          <BookmarksFolder />
        </ScrollArea>
      )}
    </>
  );
}

function BookmarksFolder() {
  const { currentFolderID } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const bookmarks = useBookmarkFolder(currentFolderID);
  return <OnlyBookmarks bookmarks={bookmarks} />;
}

function OnlyBookmarks({ bookmarks }: bookmarkTreeNodeArray) {
  const { folderSize } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => dispatch(changeCurrentFolder(id));
  const props = { folderSize, bookmarks, onFolderChange };

  return <BookmarkGrid {...props} />;
}

export default BookmarkManager;
