import { TaskType, todoType } from "@/types/slice/todo";
import { useDispatch } from "react-redux";
import {
  changeTaskIcon,
  changeTaskTitle,
  changeTaskTodos,
} from "@/redux/slice/todo";
import { cn } from "@/utils/cn";
import { SelectIconMenu } from "@/components/select-icon";
import TodoList from "@/components/editor/todo";
import { ScrollArea } from "@/components/scrollarea";

export const transparentInput =
  "border-transparent w-full bg-transparent resize-none focus:outline-hidden";

function Todo({ id, title, todos, filtered, icon }: TaskType) {
  const dispatch = useDispatch();

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeTaskTitle({ task_id: id, title: e.target.value }));

  const handleChange = (newTodos: todoType[]) => {
    dispatch(changeTaskTodos({ task_id: id, todo: newTodos }));
  };

  const iconChangeHandler = (icon: string) => {
    dispatch(changeTaskIcon({ task_id: id, icon }));
  };

  return (
    <div className="size-full relative flex flex-col gap-2 editor">
      <div className="flex justify-start items-center gap-2 px-3 h-12 icon-xl">
        <SelectIconMenu icon={icon} setIcon={iconChangeHandler} />
        <input
          className={cn(transparentInput, "text-3xl w-[calc(100%-90px)] ")}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <ScrollArea className="size-full" scrollBarProps={{ className: "w-2" }}>
        <TodoList onChange={handleChange} {...{ todos, filtered }} />
      </ScrollArea>
    </div>
  );
}

export default Todo;
