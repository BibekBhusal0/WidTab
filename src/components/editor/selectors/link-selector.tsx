import { useEditor } from "novel";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuPopover from "@/components/popoverMenu";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { Icon2RN } from "@/theme/icons";
import { getUrlFromString } from "@/utils/url";

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
          <div className="icon-sm flex-center size-full gap-2">
            <Icon2RN icon="gravity-ui:link" />
            <div
              className={cn(
                "text-sm underline decoration-stone-400 underline-offset-4",
                editor.isActive("link") && "text-blue-500"
              )}>
              Link
            </div>
          </div>
        }>
        <div className="flex-center flex-col gap-2 px-2 py-1">
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
              <Icon2RN icon={l ? delete_ : "material-symbols:check-rounded"} className="size-4" />
            }
            children={l ? "Remove Link" : "Add Link"}
          />
        </div>
      </MenuPopover>
    </>
  );
};
