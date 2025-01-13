import {
  TiptapLink,
  TaskList,
  TaskItem,
  StarterKit,
  Placeholder,
  TiptapUnderline,
  Color,
  TextStyle,
  HighlightExtension,
  GlobalDragHandle,
} from "novel/extensions";

export const starterKit = StarterKit.configure({
  dropcursor: { color: "var(--mui-palette-divider)", width: 3 },
});

export const defaultExtensions = [
  starterKit,
  Placeholder,
  TiptapLink,
  TaskList,
  TaskItem,
  TiptapUnderline,
  Color,
  TextStyle,
  HighlightExtension.configure({ multicolor: true }),
  GlobalDragHandle,
];
