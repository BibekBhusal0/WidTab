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
  Mathematics,
  MarkdownExtension,
  CustomKeymap,
  CodeBlockLowlight,
} from "novel/extensions";
import GlobalDragHandle from "./drag-handle";
import { common, createLowlight } from "lowlight";

const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight: createLowlight(common),
  defaultLanguage: "js",
  HTMLAttributes: { spellcheck: "false", className: "hljs" },
});

export const starterKit = StarterKit.configure({
  dropcursor: { color: "var(--mui-palette-divider)", width: 3 },
  codeBlock: false,
  code: {
    HTMLAttributes: { spellcheck: "false" },
  },
});

const markdownExtension = MarkdownExtension.configure({
  html: true,
  tightLists: true,
  tightListClass: "tight",
  bulletListMarker: "-",
  linkify: false,
  breaks: false,
  transformPastedText: true,
  transformCopiedText: false,
});

export const defaultExtensions = [
  starterKit,
  Placeholder,
  TiptapLink,
  TaskList,
  TaskItem.configure({ nested: true, taskListTypeName: "taskList" }),
  TiptapUnderline,
  Color,
  TextStyle,
  HighlightExtension.configure({ multicolor: true }),
  GlobalDragHandle,
  Mathematics,
  markdownExtension,
  CustomKeymap,
  codeBlockLowlight,
];
