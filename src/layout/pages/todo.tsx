import Todo from "../widgets/todo";
import Paper from "@mui/material/Paper";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { TaskType } from "@/types/slice/todo";
import Controls from "../widgets/controls";
import { getWidgetControlsProps } from "@/utils/getWidget";
import { ScrollArea } from "@/components/scrollarea";
import { useTodo } from "@/storage";
import { addTask } from "@/storage/todo";

function TodoPage() {
  const { add } = useCurrentIcons();
  const { Tasks, pinnedTodo } = useTodo();
  const pinnedTask = Tasks.filter((t) => t.id === pinnedTodo);
  const unPinnedTasks = Tasks.filter((t) => t.id !== pinnedTodo);
  const commonCls = "h-80 overflow-hidden";

  const renderTasks = (taskList: TaskType[]) =>
    taskList.map((task) => (
      <Paper
        key={task.id}
        sx={{
          backgroundColor:
            task.id === pinnedTodo
              ? "primaryContainer.paper"
              : "secondaryContainer.paper",
        }}
        className={commonCls}>
        <Controls {...getWidgetControlsProps("todo", task.id)} showOn="always">
          <Todo {...task} />
        </Controls>
      </Paper>
    ));

  return (
    <ScrollArea className="size-full">
      <div className="grid gap-3 grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3">
        {renderTasks(pinnedTask)}
        {renderTasks(unPinnedTasks)}
        <Paper
          sx={{
            backgroundColor: "secondaryContainer.paper",
          }}
          onClick={() => addTask("")}
          className={cn(commonCls, "flex-center group cursor-pointer")}>
          <div className="group-hover:scale-[6] scale-[3] transition-all">
            {add}
          </div>
        </Paper>
      </div>
    </ScrollArea>
  );
}

export default TodoPage;
