import { EditorRoot, JSONContent, EditorContent, useEditor } from "novel";
import Document from "@tiptap/extension-document";
import { TaskItem, TaskList } from "novel";
import { starterKit } from "@/components/editor/extensions";
import { todoType } from "@/types/slice/todo";
import GlobalDragHandle from "./drag-handle";
import { useEffect, useMemo, useRef } from "react";

const Task2JSON = (todos: todoType[]): JSONContent => {
  const content = todos.map((todo) => ({
    type: "taskItem",
    attrs: { checked: todo.checked },
    content: todo.task ? [{ type: "text", text: todo.task }] : [],
  }));
  if (content.length === 0) {
    content.push({ type: "taskItem", attrs: { checked: false }, content: [] });
  }
  return { type: "doc", content: [{ type: "taskList", content }] };
};

const JSON2Task = (json: JSONContent): todoType[] => {
  const taskListNode = json.content?.[0];
  if (!taskListNode || taskListNode.type !== "taskList" || !taskListNode.content) return [];
  const tasks = taskListNode.content.map((taskItem: any) => ({
    id: taskItem.attrs?.id,
    task: taskItem.content?.[0]?.text || "",
    checked: taskItem.attrs?.checked || false,
  }));
  return tasks;
};

const CustomDocument = Document.extend({ content: "taskList" });
const CustomTaskItem = TaskItem.extend({ content: "inline*" });

const extensions = [
  TaskList,
  GlobalDragHandle.configure({ yOffset: 55 }),
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
  todos: todoType[];
  onChange?: (value: todoType[]) => void;
  filtered?: boolean;
};

type setContentProp = Omit<TodoListProps, "onChange">;

export const TodoList = ({ todos, onChange, filtered }: TodoListProps) => {
  return (
    <EditorRoot>
      <EditorContent
        autofocus
        extensions={extensions}
        initialContent={Task2JSON(todos)}
        onUpdate={({ editor }) => {
          if (onChange) {
            const updatedTasks = JSON2Task(editor.getJSON());
            onChange(updatedTasks);
          }
        }}
        editorProps={{
          attributes: {
            class:
              "prose dark:prose-invert prose-xl focus:outline-hidden max-w-full min-h-[250px] todo-list",
          },
        }}>
        <SetContent {...{ todos, filtered }} />
      </EditorContent>
    </EditorRoot>
  );
};

export default TodoList;

const SetContent = ({ todos, filtered }: setContentProp) => {
  const { editor } = useEditor();
  const dynamicTasks = useMemo(
    () => (filtered ? todos.filter((t) => !t.checked) : [...todos]),
    [filtered, todos]
  );
  const prevHiddenLength = useRef(todos.length - dynamicTasks.length);
  const hiddenTasks = todos.length - dynamicTasks.length;
  const firstRender = useRef(true);

  useEffect(() => {
    const change = () => editor && editor.commands.setContent(Task2JSON(dynamicTasks));
    if (firstRender.current) {
      change();
      firstRender.current = false;
    }
    if (hiddenTasks !== prevHiddenLength.current) change();

    prevHiddenLength.current = hiddenTasks;
  }, [dynamicTasks.length]);
  return <> </>;
};
