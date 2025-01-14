import { EditorInstance, useEditor } from "novel";
import { useState } from "react";
import MenuPopover from "@/components/popoverMenu";
import MenuItem from "@mui/material/MenuItem";
import { Icon2RN, iconAsProp } from "@/theme/icons";

export type SelectorItem = {
  name: string;
  icon: iconAsProp;
  command: (editor: EditorInstance) => void;
  isActive: (editor: EditorInstance) => boolean;
};

const items: SelectorItem[] = [
  {
    name: "Text",
    icon: "gravity-ui:text",
    command: (editor) => editor.chain().focus().clearNodes().run(),
    isActive: (editor) =>
      editor.isActive("paragraph") &&
      !editor.isActive("bulletList") &&
      !editor.isActive("orderedList"),
  },
  {
    name: "Heading 1",
    icon: "gravity-ui:heading-1",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    name: "Heading 2",
    icon: "gravity-ui:heading-2",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    name: "Heading 3",
    icon: "gravity-ui:heading-3",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    name: "To-do List",
    icon: "gravity-ui:square-check",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskItem"),
  },
  {
    name: "Bullet List",
    icon: "gravity-ui:list-ul",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    name: "Numbered List",
    icon: "gravity-ui:list-ol",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    name: "Quote",
    icon: "gravity-ui:quote-open",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    name: "Code",
    icon: "gravity-ui:code",
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
];
export const NodeSelector = () => {
  const [key, setKey] = useState(1);
  const handleClose = () => setKey(key + 1);
  const { editor } = useEditor();
  if (!editor) return null;

  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: "Multiple",
  };

  return (
    <MenuPopover
      key={key}
      menuProps={{ sx: { maxHeight: "300px" } }}
      icon={
        <div className="size-full flex-center gap-2 icon-sm">
          <div className="text-sm">{activeItem.name}</div>
          <Icon2RN icon="ludice:chevron-down" />
        </div>
      }>
      {items.map((i) => {
        return (
          <MenuItem
            key={i.name}
            onClick={() => {
              i.command(editor);
              handleClose();
            }}
            selected={activeItem.name === i.name}
            className="gap-2 px-3 py-2">
            {/* <i.icon className="size-6 border-divider border rounded-md p-1" /> */}
            <Icon2RN
              icon={i.icon}
              className="size-6 border-divider border rounded-md p-1"
            />

            <div>{i.name}</div>
          </MenuItem>
        );
      })}
    </MenuPopover>
  );
};
