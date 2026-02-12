import { editLink, findBookmarkById, loadBookmarksFromJson } from "@/utils/bookmark";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { isValidUrl } from "novel";

type EditLinkModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export default function EditLinkModal({ open, onClose, id }: EditLinkModalProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [urlHelperText, setUrlHelperText] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");

  useEffect(() => {
    if (open) {
      const link = findBookmarkById(loadBookmarksFromJson(), id);
      if (link) {
        link?.title && setName(link.title);
        link?.url && setUrl(link.url);
      }
    }
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
