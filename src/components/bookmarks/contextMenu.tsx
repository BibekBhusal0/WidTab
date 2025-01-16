import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { toggleFavorites } from "@/redux/slice/bookmark";
import ContextMenu, { contextMenuProps } from "@/components/contextMenu";
import IconMenu from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import {
  deleteFolder,
  deleteLink,
  editFolder,
  editLink,
  findBookmarkById,
  loadBookmarksFromJson,
} from "@/utils/bookmark";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { isValidUrl } from "@/utils/url";

type AddFavProps = { id: string } & contextMenuProps;

export function LinkContextMenu({ id, ...props }: AddFavProps) {
  const { favorites } = useSelector((state: StateType) => state.bookmarks);
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  const fav = favorites.includes(id);
  const toggleFav = () => dispatch(toggleFavorites(id));
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [urlHelperText, setUrlHelperText] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");

  useEffect(() => {
    const link = findBookmarkById(loadBookmarksFromJson(), id);
    link?.title && setName(link.title);
    link?.url && setUrl(link.url);
  }, []);

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
    editLink(id, url, name);
  };

  const items = [
    {
      name: fav ? "Remove From Favorites" : "Add To Favorites",
      icon: fav ? "mdi:heart-outline" : "mdi:heart",
      onClick: toggleFav,
    },
    {
      name: "Delete",
      icon: delete_,
      onClick: () => deleteLink(id),
      color: "error.main",
    },
  ];

  return (
    <ContextMenu
      {...props}
      menuContent={
        <div>
          <div className="flex-center flex-col p-2 gap-2">
            <TextField
              sx={{ mb: "10px" }}
              autoFocus
              size="small"
              error={!!nameHelperText}
              placeholder="Title"
              label="Title"
              value={name}
              onChange={handleNameChange}
              helperText={nameHelperText}
            />
            <TextField
              size="small"
              error={!!urlHelperText}
              placeholder="URL"
              label="URL"
              value={url}
              onChange={handleUrlChange}
              helperText={urlHelperText}
            />
            <Button onClick={handleClick} variant="outlined">
              Save
            </Button>
          </div>
          <Divider />

          <IconMenu menuItems={items} />
        </div>
      }
      closeOnClick={false}
    />
  );
}

export function FolderContextMenu({ id, ...props }: AddFavProps) {
  const { delete_ } = useCurrentIcons();
  const [name, setName] = useState("");
  const [helperText, setHelperText] = useState("");
  useEffect(() => {
    const link = findBookmarkById(loadBookmarksFromJson(), id);
    link?.title && setName(link.title);
  }, []);
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
    editFolder(id, name);
  };
  const items = [
    {
      name: "Delete",
      icon: delete_,
      onClick: () => deleteFolder(id),
      color: "error.main",
    },
  ];

  return (
    <ContextMenu
      {...props}
      menuContent={
        <div>
          <div className="flex-center flex-col p-2 gap-3">
            <TextField
              sx={{ width: "130px" }}
              autoFocus
              size="small"
              error={!!helperText}
              placeholder="Name"
              label="Name"
              value={name}
              onChange={handleTextChange}
              helperText={helperText}
            />
            <Button onClick={handleClick} variant="outlined">
              Rename
            </Button>
          </div>
          <Divider />
          <IconMenu menuItems={items} />
        </div>
      }
      closeOnClick={false}
    />
  );
}
