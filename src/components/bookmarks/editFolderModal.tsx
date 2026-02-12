import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { removeFolderIcon, setFolderIcon } from "@/redux/slice/bookmark";
import { editFolder, findBookmarkById, loadBookmarksFromJson } from "@/utils/bookmark";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import RenameItem from "../renameItem";
import { SelectIconMenu } from "../select-icon";
import { Icon2RN } from "@/theme/icons";
import useCurrentIcons from "@/hooks/useCurrentIcons";

type EditFolderModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export default function EditFolderModal({ open, onClose, id }: EditFolderModalProps) {
  const { delete_ } = useCurrentIcons();
  const [name, setName] = useState("");
  const { folderIcons } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      const folder = findBookmarkById(loadBookmarksFromJson(), id);
      folder?.title && setName(folder.title);
    }
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
