import { EditorRoot, EditorContent, JSONContent } from "novel";
import Document from "@tiptap/extension-document";
import {
  GlobalDragHandle,
  Placeholder,
  TaskItem,
  TaskList,
} from "novel/extensions";
import { starterKit } from "@/components/editor/extensions";
import { todoType } from "@/types/slice/todo";

const Task2JSON = (todos: todoType[]): JSONContent => ({
  type: "doc",
  content: [
    {
      type: "taskList",
      content: todos.map((todo) => ({
        type: "taskItem",
        attrs: { checked: todo.checked, id: todo.id },
        content: [{ type: "text", text: todo.task }],
      })),
    },
  ],
});

const JSON2Task = (json: JSONContent): todoType[] => {
  const taskListNode = json.content?.[0];
  if (
    !taskListNode ||
    taskListNode.type !== "taskList" ||
    !taskListNode.content
  )
    return [];
  return taskListNode.content.map((taskItem: any) => ({
    id: taskItem.attrs?.id,
    task: taskItem.content[0]?.text || "",
    checked: taskItem.attrs?.checked || false,
  }));
};

const CustomDocument = Document.extend({ content: "taskList" });
const CustomTaskItem = TaskItem.extend({ content: "inline*" });

const extensions = [
  TaskList,
  GlobalDragHandle,
  Placeholder.configure({ placeholder: "Add a task..." }),
  starterKit.configure({
    horizontalRule: false,
    listItem: false,
    orderedList: false,
    blockquote: false,
    bold: false,
    bulletList: false,
    heading: false,
    italic: false,
    strike: false,
    hardBreak: false,
    code: false,
    codeBlock: false,
    document: false,
  }),
  CustomDocument,
  CustomTaskItem,
];

export type TodoListProps = {
  tasks: todoType[];
  onChange?: (value: todoType[]) => void;
};

export const TodoList = ({ tasks, onChange }: TodoListProps) => {
  const handleUpdate = (editor: any) => {
    if (onChange) {
      const updatedTasks = JSON2Task(editor.getJSON());
      onChange(updatedTasks);
    }
  };

  return (
    <EditorRoot>
      <EditorContent
        className="size-full overflow-auto"
        extensions={extensions}
        initialContent={Task2JSON(tasks)}
        onUpdate={({ editor }) => handleUpdate(editor)}
        editorProps={{
          attributes: {
            class: `prose dark:prose-invert prose-xl prose-headings:font-title font-default focus:outline-none max-w-full size-full min-h-[270px] todo-list `,
          },
        }}
      />
    </EditorRoot>
  );
};

export default TodoList;
