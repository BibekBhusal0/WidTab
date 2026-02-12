import browser from "webextension-polyfill";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { removeFolderIcon, setFolderIcon, toggleFavorites } from "@/redux/slice/bookmark";
import ContextMenu, { contextMenuProps } from "@/components/contextMenu";
import IconMenu from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { deleteFolder, deleteLink, editFolder, editLink } from "@/utils/bookmark";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import { isValidUrl } from "novel";
import RenameItem from "../renameItem";
import { SelectIconMenu } from "../select-icon";
import { Icon2RN } from "@/theme/icons";

type AddFavProps = { id: string } & contextMenuProps;

type EditLinkModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

function EditLinkModal({ open, onClose, id }: EditLinkModalProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [urlHelperText, setUrlHelperText] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");

  useEffect(() => {
    browser.bookmarks
      .get(id)
      .then((bookmarks) => {
        if (!bookmarks || bookmarks.length === 0) return;
        const link = bookmarks[0];
        link?.title && setName(link.title);
        link?.url && setUrl(link.url);
      })
      .catch();
  }, [open, id]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUrl(e.target.value);
    if (urlHelperText) setUrlHelperText("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
    if (nameHelperText) setNameHelperText("");
  };

  const handleSave = () => {
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Bookmark</DialogTitle>
      <DialogContent>
        <div className="mt-2 flex flex-col gap-4">
          <TextField
            autoFocus
            size="small"
            error={!!nameHelperText}
            placeholder="Title"
            label="Title"
            value={name}
            onChange={handleNameChange}
            helperText={nameHelperText}
            fullWidth
          />
          <TextField
            size="small"
            error={!!urlHelperText}
            placeholder="URL"
            label="URL"
            value={url}
            onChange={handleUrlChange}
            helperText={urlHelperText}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type EditFolderModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

function EditFolderModal({ open, onClose, id }: EditFolderModalProps) {
  const { delete_ } = useCurrentIcons();
  const [name, setName] = useState("");
  const { folderIcons } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();

  useEffect(() => {
    browser.bookmarks.get(id).then((bookmarks) => {
      if (!bookmarks || bookmarks.length === 0) return;
      const link = bookmarks[0];
      link?.title && setName(link.title);
    });
  }, [open, id]);

  const emptyIcon = "ic:outline-circle";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Folder</DialogTitle>
      <DialogContent>
        <div className="flex-center flex-col gap-4 p-2">
          <RenameItem
            handleChange={(newName) => editFolder(id, newName)}
            initialText={name}
            inputProps={{
              placeholder: "Name",
              autoFocus: true,
              label: "Name",
            }}
            children={<InputLabel children="Name" />}
          />
          <div className="full-between icon-lg px-1 text-lg">
            Icon
            <SelectIconMenu
              icon={folderIcons?.[id] || emptyIcon}
              setIcon={(icon) =>
                icon !== emptyIcon && dispatch(setFolderIcon({ fodler: id, icon }))
              }
              children={
                <Button
                  onClick={() => dispatch(removeFolderIcon({ fodler: id }))}
                  variant="outlined"
                  color="error"
                  startIcon={<Icon2RN icon={delete_} />}>
                  Remove
                </Button>
              }
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}

export function LinkContextMenu({ id, ...props }: AddFavProps) {
  const { favorites } = useSelector((state: StateType) => state.bookmarks);
  const { delete_, edit } = useCurrentIcons();
  const dispatch = useDispatch();
  const fav = favorites.includes(id);
  const toggleFav = () => dispatch(toggleFavorites(id));

  const [editModalOpen, setEditModalOpen] = useState(false);

  const items = [
    {
      name: fav ? "Remove From Favorites" : "Add To Favorites",
      icon: fav ? "mdi:heart-outline" : "mdi:heart",
      onClick: toggleFav,
    },
    {
      name: "Edit",
      icon: edit,
      onClick: () => setEditModalOpen(true),
    },
    {
      name: "Delete",
      icon: delete_,
      onClick: () => deleteLink(id),
      color: "error.main",
    },
  ];

  return (
    <>
      <ContextMenu {...props} menuContent={<IconMenu menuItems={items} />} />
      <EditLinkModal open={editModalOpen} onClose={() => setEditModalOpen(false)} id={id} />
    </>
  );
}

export function FolderContextMenu({ id, ...props }: AddFavProps) {
  const { delete_, edit } = useCurrentIcons();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const items = [
    {
      name: "Edit",
      icon: edit,
      onClick: () => setEditModalOpen(true),
    },
    {
      name: "Delete",
      icon: delete_,
      onClick: () => deleteFolder(id),
      color: "error.main",
    },
  ];

  return (
    <>
      <ContextMenu {...props} menuContent={<IconMenu menuItems={items} />} />
      <EditFolderModal open={editModalOpen} onClose={() => setEditModalOpen(false)} id={id} />
    </>
  );
}
