import { useEditor } from "novel";
import type { SelectorItem } from "./node-selector";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
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
    {
      name: "math",
      isActive: (editor) => editor.isActive("math"),
      command: (editor) => {
        if (editor.isActive("math")) {
          editor.chain().focus().unsetLatex().run();
        } else {
          const { from, to } = editor.state.selection;
          const latex = editor.state.doc.textBetween(from, to);

          if (!latex) return;

          editor.chain().focus().setLatex({ latex }).run();
        }
      },
      icon: "gravity-ui:curly-brackets-function",
    },
  ];

  return (
    <ButtonGroup variant="outlined" className="p-2">
      {items.map(({ command, icon, isActive, name }, index) => (
        <Tooltip
          key={index}
          arrow
          title=<div className="capitalize">{name}</div>>
          <Button
            size="medium"
            onClick={() => command(editor)}
            sx={{
              color: isActive(editor) ? "primary.main" : "text.primary",
              backgroundColor: isActive(editor)
                ? "var(--primary-3)"
                : "transparent",
              paddingX: "0",
            }}
            variant="outlined">
            <Icon2RN icon={icon} className="size-4" />
          </Button>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
};
