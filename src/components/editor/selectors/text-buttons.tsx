import { useEditor } from "novel";
import type { SelectorItem } from "./node-selector";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Icon2RN } from "@/theme/icons";

export const TextButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor.isActive("bold"),
      command: (editor) => editor.chain().focus().toggleBold().run(),
      icon: "gravity-ui:bold",
    },
    {
      name: "italic",
      isActive: (editor) => editor.isActive("italic"),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      icon: "gravity-ui:italic",
    },
    {
      name: "underline",
      isActive: (editor) => editor.isActive("underline"),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: "gravity-ui:underline",
    },
    {
      name: "strike",
      isActive: (editor) => editor.isActive("strike"),
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      icon: "gravity-ui:strikethrough",
    },
    {
      name: "code",
      isActive: (editor) => editor.isActive("code"),
      command: (editor) => editor.chain().focus().toggleCode().run(),
      icon: "gravity-ui:code",
    },
  ];

  return (
    <ButtonGroup variant="outlined" className="p-2">
      {items.map((item, index) => (
        <Button
          key={index}
          size="medium"
          onClick={() => {
            item.command(editor);
          }}
          sx={{
            color: item.isActive(editor) ? "primary.main" : "text.primary",
            backgroundColor: item.isActive(editor)
              ? "var(--primary-3)"
              : "transparent",
          }}
          variant="outlined">
          <Icon2RN icon={item.icon} className="size-4" />
        </Button>
      ))}
    </ButtonGroup>
  );
};
