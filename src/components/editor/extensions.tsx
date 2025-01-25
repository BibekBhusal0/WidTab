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
import {
  NodeViewContent,
  NodeViewWrapper,
  NodeViewProps,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { CopyButton } from "../copyButton";
import { createLowlight, all } from "lowlight";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ScrollArea } from "../scrollarea";

export const CodeBlockComponent = ({
  node,
  updateAttributes,
  editor,
  extension,
}: NodeViewProps) => {
  var currentLanguage = node.attrs.language || node.attrs.defaultLanguage;
  currentLanguage = currentLanguage === "null" ? "auto" : currentLanguage;
  const codeContent = node.textContent;
  const languages = extension.options.lowlight.listLanguages();

  return (
    <NodeViewWrapper className="my-4 mx-2 border-divider rounded-lg border">
      <div className="full-between px-4 py-1 bg-secondaryContainer-default sticky top-0 z-10 rounded-t-lg">
        {editor.isEditable ? (
          <Select
            value={currentLanguage || "auto"}
            className="uppercase"
            onChange={(e) => updateAttributes({ language: e.target.value })}
            size="small"
            variant="filled"
            disableUnderline
            MenuProps={{ sx: { maxHeight: "300px" } }}
            sx={{
              ".MuiSelect-select": {
                padding: "8px",
                paddingBottom: "6px",
              },
              fontSize: "12px",
            }}>
            <MenuItem value="auto">Auto</MenuItem>
            {languages.map((lang: string) => (
              <MenuItem
                key={lang}
                value={lang}
                children={lang}
                className="uppercase"
              />
            ))}
          </Select>
        ) : (
          <div
            className="uppercase"
            children={currentLanguage === "null" ? "auto" : currentLanguage}
          />
        )}

        <CopyButton children={codeContent} />
      </div>
      <ScrollArea
        scrollBarProps={{ orientation: "horizontal", className: "h-2" }}>
        <pre
          spellCheck={"false"}
          className="m-0 border-none rounded-b-lg text-[#24292e] bg-[#ffffff] dark:text-[#c9d1d9] dark:bg-[#0d1117] w-max">
          <NodeViewContent as="code" />
        </pre>
      </ScrollArea>
    </NodeViewWrapper>
  );
};

const codeBlockLowlight = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({
  lowlight: createLowlight(all),
  defaultLanguage: "auto",
});

export const starterKit = StarterKit.configure({
  dropcursor: { color: "var(--mui-palette-divider)", width: 3 },
  codeBlock: false,
  code: {
    HTMLAttributes: { spellcheck: "false" },
  },
});

export const markdownExtension = MarkdownExtension.configure({
  html: true,
  tightLists: true,
  tightListClass: "tight",
  bulletListMarker: "-",
  linkify: false,
  breaks: false,
  transformPastedText: true,
  transformCopiedText: false,
});
export const taskItem = TaskItem.configure({
  nested: true,
  taskListTypeName: "taskList",
});
export const placeholderExtension = Placeholder.configure({
  showOnlyWhenEditable: true,
  emptyNodeClass: "pre",
});
export const defaultExtensions = [
  starterKit,
  placeholderExtension,
  TiptapLink,
  TaskList,
  taskItem,
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
