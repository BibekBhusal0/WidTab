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
  CustomKeymap,
  CodeBlockLowlight,
  TiptapImage,
} from "novel";
import { Markdown as MarkdownExtension } from "tiptap-markdown";
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
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ScrollArea } from "../scrollarea";
import { Icon2RN } from "@/theme/icons";
import { useState } from "react";

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

  const getMarkdownHTML = () => {
    if (!editor.storage.markdown?.parser) return "";
    return editor.storage.markdown.parser.parse(codeContent);
  };

  const [showPreview, setShowPreview] = useState(false);

  return (
    <NodeViewWrapper className="bg-secondary-container-default mx-2 my-4 rounded-lg border">
      <div className="full-between bg-secondary-container-default sticky top-0 z-10 rounded-t-lg px-4 py-1">
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
                padding: "7px",
                paddingBottom: "2px",
              },
              fontSize: "12px",
            }}>
            <MenuItem value="auto">Auto</MenuItem>
            {languages.map((lang: string) => (
              <MenuItem key={lang} value={lang} children={lang} className="uppercase" />
            ))}
          </Select>
        ) : (
          <div
            className="uppercase"
            children={currentLanguage === "null" ? "auto" : currentLanguage}
          />
        )}

        {currentLanguage === "markdown" && (
          <Button
            sx={{ paddingY: "2px", paddingX: "14px" }}
            onClick={() => setShowPreview(!showPreview)}
            variant={showPreview ? "outlined" : "contained"}
            className="text-sm font-medium uppercase"
            startIcon={<Icon2RN icon="mdi:language-markdown" className="size-6" />}>
            {showPreview ? "Code" : "Preview"}
          </Button>
        )}

        <CopyButton children={codeContent} />
      </div>
      <ScrollArea
        className="rounded-t-0 rounded-b-lg"
        scrollBarProps={{
          orientation: "horizontal",
          className: "h-2 cursor-default",
        }}>
        <pre
          spellCheck={"false"}
          className="hljs m-0 w-max min-w-full rounded-none border-none text-base">
          {showPreview && currentLanguage === "markdown" ? (
            <div
              className="pointer-events-none cursor-auto"
              dangerouslySetInnerHTML={{ __html: getMarkdownHTML() }}
              contentEditable={false}
            />
          ) : (
            <NodeViewContent as="code" />
          )}
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

export const MathExtension = Mathematics.extend({
  addKeyboardShortcuts() {
    return {
      "Mod-m": () => {
        if (this.editor.isActive("math")) {
          return this.editor.chain().focus().unsetLatex().run();
        } else {
          const { from, to } = this.editor.state.selection;
          const latex = this.editor.state.doc.textBetween(from, to);
          if (!latex) return false;
          return this.editor.chain().focus().setLatex({ latex }).run();
        }
      },
    };
  },
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
  HighlightExtension,
  GlobalDragHandle,
  MathExtension,
  markdownExtension,
  CustomKeymap,
  codeBlockLowlight,
  TiptapImage,
];
