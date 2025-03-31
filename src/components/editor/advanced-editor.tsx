import { EditorRoot, EditorContent, JSONContent } from "novel";
import { ImageResizer } from "novel";
import { handleCommandNavigation } from "novel";
import { defaultExtensions } from "./extensions";
import { SlashCommand, slashCommand } from "./slash-command";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Bubble } from "./selectors/bubble";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  value?: JSONContent | string;
  onChange?: ((value: JSONContent) => void) | ((value: string) => void);
}

interface markdownPreviewProps {
  value?: string;
  className?: string;
}
type AdvancedEditorProps = {
  editable?: boolean;
  children?: ReactNode;
  className?: string;
} & EditorProp;

const AdvancedEditor = ({
  value,
  onChange,
  editable = true,
  children,
  className,
}: AdvancedEditorProps) => {
  return (
    <EditorRoot>
      <EditorContent
        autofocus={editable}
        className="relative z-1 "
        {...{ children, editable, extensions }}
        initialContent={value as JSONContent}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },

          attributes: {
            class: cn(
              "prose dark:prose-invert prose-sm prose-headings:font-title prose-pre:m-0",
              "font-default focus:outline-hidden max-w-full",
              className,
            ),
          },
        }}
        onUpdate={({ editor }) => {
          if (!editor || !onChange || typeof value === "undefined") return;

          if (typeof value === "string") {
            (onChange as (value: string) => void)(
              editor.storage.markdown.getMarkdown(),
            );
          } else {
            (onChange as (value: JSONContent) => void)(editor.getJSON());
          }
        }}
        slotAfter={<ImageResizer />}
      />
    </EditorRoot>
  );
};

const Editor = (props: EditorProp) => {
  return (
    <AdvancedEditor {...props} className="min-h-[250px]">
      <SlashCommand />
      <Bubble />
    </AdvancedEditor>
  );
};

export const MarkdownPreview = (props: markdownPreviewProps) => {
  return <AdvancedEditor editable={false} {...props} />;
};

export default Editor;
