import { useEditor } from "novel";
import type { SelectorItem } from "./node-selector";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Icon2RN } from "@/theme/icons";

type SelectorItemAndShortcut = SelectorItem & {
  shortcut?: string;
};

export const TextButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const items: SelectorItemAndShortcut[] = [
    {
      name: "bold",
      isActive: (editor) => editor.isActive("bold"),
      command: (editor) => editor.chain().focus().toggleBold().run(),
      icon: "gravity-ui:bold",
      shortcut: "B",
    },
    {
      name: "italic",
      isActive: (editor) => editor.isActive("italic"),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      icon: "gravity-ui:italic",
      shortcut: "I",
    },
    {
      name: "underline",
      isActive: (editor) => editor.isActive("underline"),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: "gravity-ui:underline",
      shortcut: "U",
    },
    {
      name: "strike",
      isActive: (editor) => editor.isActive("strike"),
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      icon: "gravity-ui:strikethrough",
      shortcut: "Shift + S",
    },
    {
      name: "code",
      isActive: (editor) => editor.isActive("code"),
      command: (editor) => editor.chain().focus().toggleCode().run(),
      icon: "gravity-ui:code",
      shortcut: "E",
    },
    {
      name: "Math Formula",
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
      shortcut: "M",
    },
  ];

  return (
    <ButtonGroup variant="outlined" className="p-2">
      {items.map(({ command, icon, isActive, name, shortcut }, index) => (
        <Tooltip
          key={index}
          placement="top"
          arrow
          title={
            <div className="flex-center flex-col gap-2">
              <div className="text-md capitalize">{name}</div>
              {shortcut && (
                <div className="flex-center gap-1">
                  <Icon2RN icon="mingcute:command-line" className="size-4" />
                  <div className="text-sm">+ {shortcut}</div>
                </div>
              )}
            </div>
          }>
          <Button
            size="medium"
            onClick={() => command(editor)}
            sx={{
              color: isActive(editor) ? "primary.main" : "text.primary",
              backgroundColor: isActive(editor) ? "var(--primary-3)" : "transparent",
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
