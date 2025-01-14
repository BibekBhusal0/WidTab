import { useEditor } from "novel";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuPopover from "@/components/popoverMenu";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { Icon2RN } from "@/theme/icons";

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}

export const LinkSelector = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(1);
  const handleClose = () => setKey(key + 1);
  const { delete_ } = useCurrentIcons();
  const { editor } = useEditor();

  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });
  const l = editor?.getAttributes("link").href;
  const [link, setLink] = useState(l || "");

  if (!editor) return null;

  const allLink = () => {
    editor.chain().focus().unsetLink().run();
    handleClose();
  };

  const removeLink = () => {
    const url = getUrlFromString(link);
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      handleClose();
    }
  };

  return (
    <>
      <MenuPopover
        key={key}
        icon={
          <div className="size-full icon-sm flex-center gap-2">
            <Icon2RN icon="tabler:link" />
            <div
              className={cn(
                "underline decoration-stone-400 underline-offset-4 text-sm",
                editor.isActive("link") && "text-blue-500"
              )}>
              Link
            </div>
          </div>
        }>
        <div className="flex-center py-1 px-2 gap-2 flex-col">
          <TextField
            size="small"
            label="Link"
            variant="outlined"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
          <Button
            size="small"
            variant={l ? "outlined" : "contained"}
            color={l ? "error" : "success"}
            onClick={l ? allLink : removeLink}
            startIcon={
              <Icon2RN
                icon={l ? delete_ : "material-symbols:check-rounded"}
                className="size-4"
              />
            }
            children={l ? "Remove Link" : "Add Link"}
          />
        </div>
      </MenuPopover>
    </>
  );
};
