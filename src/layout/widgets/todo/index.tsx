import { TaskType, todoType } from "@/types/slice/todo";
import { useDispatch } from "react-redux";
import SortableCheckbox from "./checkbox";
import { useEffect, useRef, useState } from "react";
import {
  addTodo,
  deleteTodo,
  changeTask,
  changeTodo,
  toggleTodo,
} from "@/redux/slice/todo";
import { cn } from "@/utils/cn";
import { SelectIconMenu } from "@/components/select-icon";
import { ScrollArea } from "@/components/scrollarea";
import { Sortable } from "@/components/sortable";
import TodoList from "@/components/editor/todo";

export const transparentInput =
  "border-transparent w-full bg-transparent resize-none focus:outline-none";

function Todo({ id, title, todos, filtered, icon }: TaskType) {
  const dispatch = useDispatch();
  const taskRefs = useRef<Map<number, HTMLTextAreaElement | null>>(new Map());
  const titleRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(1);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [todos, filtered]);
  var dynamicTasks = [...todos];

  if (filtered) {
    dynamicTasks = todos.filter((t) => !t.checked);
  }

  const addTodoItem = () => {
    dispatch(addTodo({ task_id: id, task: "" }));
  };
  const titleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodoItem();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = 0;

      if (nextIndex < dynamicTasks.length) {
        const nextTaskId = dynamicTasks[nextIndex].id;
        const nextElement = taskRefs.current.get(nextTaskId);
        nextElement?.focus();
      }
    }
  };
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      changeTask({
        task_id: id,
        change_item: "title",
        title: e.target.value,
      })
    );
  console.log("todos ", JSON.stringify(todos, null, 2));
  const handleReorder = (newOrder: todoType[]) => {
    console.log("newTodos ", JSON.stringify(newOrder, null, 2));
    dispatch(
      changeTask({
        task_id: id,
        change_item: "todo",
        todo: newOrder,
      })
    );
  };
  const iconChangeHandler = (icon: string) => {
    dispatch(changeTask({ task_id: id, change_item: "icon", icon }));
  };

  return (
    <div className="size-full editor">
      <div className="flex justify-start items-center gap-2 px-3 h-12 icon-xl">
        <SelectIconMenu icon={icon} setIcon={iconChangeHandler} />
        <input
          ref={titleRef}
          onKeyDown={titleKeyDown}
          className={cn(transparentInput, "text-3xl w-[calc(100%-90px)] ")}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <div className="size-full h-[calc(100%-48px)]">
        <TodoList key={key} tasks={dynamicTasks} onChange={handleReorder} />
      </div>
    </div>
  );
}

export default Todo;
