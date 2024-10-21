import { TaskType, todoType } from "@/types/slice/todo";
import { useDispatch } from "react-redux";
import { AnimatePresence, Reorder } from "framer-motion";
import SortableCheckbox from "./checkbox";
import IconButton from "@mui/material/IconButton";

import TodoMenu from "./todo-menu";
import { useRef } from "react";
import {
  addTodo,
  deleteTodo,
  changeTask,
  changeTodo,
  toggleTodo,
} from "@/redux/slice/todo";
import { cn } from "@/utils/cn";
import { SelectIconMenu } from "@/components/select-icon";
import HoverControls from "@/components/hoverControls";
import WidgetControls from "@/components/widgetControl";
import useCurrentIcons from "@/hooks/useCurrentIcons";

export const transparentInput =
  "border-transparent w-full bg-transparent resize-none focus:outline-none";

function Todo({ id, title, todos, filtered, sorted, icon }: TaskType) {
  const dispatch = useDispatch();
  const { add } = useCurrentIcons();
  const taskRefs = useRef<Map<number, HTMLTextAreaElement | null>>(new Map());
  const titleRef = useRef<HTMLInputElement>(null);
  var dynamicTasks = [...todos];

  if (filtered) {
    dynamicTasks = todos.filter((t) => !t.checked);
  } else if (sorted) {
    dynamicTasks = [
      ...todos.filter((t) => !t.checked),
      ...todos.filter((t) => t.checked),
    ];
  }

  const focusPrevious = (currentTodoId: number) => {
    const currentIndex = dynamicTasks.findIndex(
      (task) => task.id === currentTodoId
    );
    const previousIndex = currentIndex - 1;

    var focusOn: HTMLTextAreaElement | HTMLInputElement | null | undefined =
      null;
    if (previousIndex >= 0) {
      const previousTaskId = dynamicTasks[previousIndex].id;
      focusOn = taskRefs.current.get(previousTaskId);
    } else {
      focusOn = titleRef.current;
    }
    focusOn?.focus();
  };
  const focusNext = (currentTodoId: number) => {
    const currentIndex = dynamicTasks.findIndex(
      (task) => task.id === currentTodoId
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < dynamicTasks.length) {
      const nextTaskId = dynamicTasks[nextIndex].id;
      const nextElement = taskRefs.current.get(nextTaskId);
      nextElement?.focus();
    }
  };
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
  const handleReorder = (newOrder: number[]) => {
    const orderedTasks = newOrder
      .map((id) => dynamicTasks.find((task) => task.id === id))
      .filter((task): task is todoType => task !== undefined);

    dispatch(
      changeTask({
        task_id: id,
        change_item: "todo",
        todo: orderedTasks,
      })
    );
  };
  const iconChangeHandler = (icon: string) => {
    dispatch(changeTask({ task_id: id, change_item: "icon", icon }));
  };

  return (
    <HoverControls
      controls={
        <WidgetControls className="flex">
          <IconButton onClick={addTodoItem}>{add}</IconButton>
          <TodoMenu {...{ id, icon, title, todos, filtered, sorted }} />
        </WidgetControls>
      }
      className="size-full">
      <div className="flex justify-between items-center gap-2 px-3 h-12 icon-xl">
        <SelectIconMenu
          icon={icon}
          setIcon={iconChangeHandler}
          buttonProps={{ sx: { p: 0.7, m: 0 } }}
        />
        <input
          ref={titleRef}
          onKeyDown={titleKeyDown}
          className={cn(transparentInput, "text-3xl")}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <div className="overflow-auto scroll-container py-4 px-0.5 space-y-3 w-full h-5/6">
        <Reorder.Group
          className="space-y-2"
          values={dynamicTasks.map((t) => t.id)}
          onReorder={handleReorder}>
          <AnimatePresence>
            {dynamicTasks.map((task) => (
              <SortableCheckbox
                ref_={(el: HTMLTextAreaElement | null) =>
                  taskRefs.current.set(task.id, el)
                }
                handleDelete={() => {
                  dispatch(deleteTodo({ task_id: id, todo_id: task.id }));
                }}
                focusPrevious={() => focusPrevious(task.id)}
                focusNext={() => focusNext(task.id)}
                handleChange={(val: string) =>
                  dispatch(
                    changeTodo({
                      task_id: id,
                      todo_id: task.id,
                      task: val,
                    })
                  )
                }
                handleToggle={() => {
                  dispatch(toggleTodo({ task_id: id, todo_id: task.id }));
                }}
                key={task.id}
                addTodo={addTodoItem}
                {...task}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>
    </HoverControls>
  );
}

export default Todo;
