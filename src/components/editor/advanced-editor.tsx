import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Icon2RN } from "@/theme/icons";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  value?: JSONContent | string;
  onChange?: ((value: JSONContent) => void) | ((value: string) => void);
}
const Editor = ({ value, onChange }: EditorProp) => {
  return (
    <EditorRoot>
      <EditorContent
        className="size-full overflow-auto"
        extensions={extensions}
        initialContent={value as JSONContent}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },

          attributes: {
            class: `prose dark:prose-invert prose-sm prose-headings:font-title font-default focus:outline-none max-w-full size-full min-h-[270px]`,
          },
        }}
        onUpdate={({ editor }) => {
          if (!editor || !onChange || !value) return;

          if (typeof value === "string") {
            (onChange as (value: string) => void)(editor.getHTML());
          } else {
            (onChange as (value: JSONContent) => void)(editor.getJSON());
          }
        }}>
        <EditorCommand className="z-50 h-auto max-h-[300px] overflow-auto w-[250px]">
          <Card className="size-full px-1 py-3">
            <EditorCommandEmpty className="px-2 text-divider">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className={`flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-[rgba(var(--mui-palette-primary-mainChannel)/var(--mui-palette-action-selectedOpacity))] aria-selected:bg-[rgba(var(--mui-palette-primary-mainChannel)/var(--mui-palette-action-selectedOpacity))] `}
                  key={item.title}>
                  <Icon2RN
                    icon={item.icon}
                    className="size-10 p-2 border-divider rounded-md border"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </Card>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{ placement: "top" }}
          className="flex-center flex-col w-fit max-w-[90vw] overflow-hidden">
          <Card className="size-full">
            <TextButtons />
            <Divider orientation="horizontal" flexItem />
            <div className="flex-center w-full">
              <NodeSelector />
              <Divider orientation="vertical" flexItem />
              <LinkSelector />
              <Divider orientation="vertical" flexItem />
              <ColorSelector />
            </div>
          </Card>
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};

export default Editor;
