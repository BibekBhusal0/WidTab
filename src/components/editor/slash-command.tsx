import { Command, renderItems, SuggestionItem } from "novel";
import { tost } from "../tost";
import {
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
} from "novel";
import { Icon2RN } from "@/theme/icons";
import { ScrollArea } from "../scrollarea";

export const suggestionItems: SuggestionItem[] = [
  {
    title: "Text",
    description: "Just Plain text.",
    searchTerms: ["p", "paragraph"],
    icon: "gravity-ui:text",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox", "list"],
    icon: "gravity-ui:square-check",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: "gravity-ui:heading-1",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: "gravity-ui:heading-2",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: "gravity-ui:heading-3",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: "gravity-ui:list-ul",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    searchTerms: ["ordered"],
    icon: "gravity-ui:list-ol",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["blockquote"],
    icon: "gravity-ui:quote-open",
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock"],
    icon: "gravity-ui:code",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Download",
    description: "Download contents in markdown",
    icon: "tabler:download",
    command: ({ editor }) => {
      try {
        const content = editor.storage.markdown.getMarkdown();
        const a = document.createElement("a");
        const url = URL.createObjectURL(
          new Blob([content], { type: "text/markdown" }),
        );
        a.href = url;
        a.download = "editor.md";
        a.click();
        URL.revokeObjectURL(url);
        tost({ children: "Download Sucessful", severity: "success" });
      } catch (error) {
        tost({
          children: (
            <>
              <div className="text-lg">Download Failed</div> {`${error}`}
            </>
          ),
          severity: "error",
        });
      }
    },
  },
];

export const SlashCommand = () => {
  return (
    <EditorCommand className="z-50 w-[250px] px-1 py-3 bg-background-default rounded-themed">
      <ScrollArea
        viewPortProps={{ className: "h-auto max-h-[300px]" }}
        scrollBarProps={{ className: "w-2" }}
      >
        <EditorCommandEmpty className="px-2 text-divider">
          No results
        </EditorCommandEmpty>
        <EditorCommandList>
          {suggestionItems.map((item) => (
            <EditorCommandItem
              value={[
                item.title,
                ...(item.searchTerms === undefined ? [] : item.searchTerms),
              ].join(" ")}
              onCommand={(val) => item.command?.(val)}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm aria-selected:bg-primary-selected"
              key={item.title}
            >
              <Icon2RN
                icon={item.icon}
                className="size-10 p-2 rounded-md border"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs">{item.description}</p>
              </div>
            </EditorCommandItem>
          ))}
        </EditorCommandList>
      </ScrollArea>
    </EditorCommand>
  );
};

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
