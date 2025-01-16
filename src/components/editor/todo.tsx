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

const Task2JSON = (todos: todoType[]): JSONContent => {
  return {
    type: "doc",
    content: [
      {
        type: "taskList",
        content: todos.map((todo) => ({
          type: "taskItem",
          attrs: { checked: todo.checked },
          content: todo.task ? [{ type: "text", text: todo.task }] : [],
        })),
      },
    ],
  };
};

const JSON2Task = (json: JSONContent): todoType[] => {
  const taskListNode = json.content?.[0];
  if (
    !taskListNode ||
    taskListNode.type !== "taskList" ||
    !taskListNode.content
  )
    return [];
  const tasks = taskListNode.content.map((taskItem: any) => ({
    id: taskItem.attrs?.id,
    task: taskItem.content?.[0]?.text || "",
    checked: taskItem.attrs?.checked || false,
  }));
  console.log(JSON.stringify(tasks, null, 1));
  return tasks;
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
  return (
    <EditorRoot>
      <EditorContent
        autofocus
        className="size-full overflow-auto"
        extensions={extensions}
        initialContent={Task2JSON(tasks)}
        onUpdate={({ editor }) => {
          if (onChange) {
            const updatedTasks = JSON2Task(editor.getJSON());
            onChange(updatedTasks);
          }
        }}
        editorProps={{
          attributes: {
            class: `prose dark:prose-invert prose-xl prose-headings:font-title font-default focus:outline-none max-w-full size-full min-h-[250px] todo-list `,
          },
        }}
      />
    </EditorRoot>
  );
};

export default TodoList;
