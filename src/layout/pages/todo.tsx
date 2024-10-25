import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../widgets/todo";
import Paper from "@mui/material/Paper";
import { addTask } from "@/redux/slice/todo";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { TaskType } from "@/types/slice/todo";

function TodoPage() {
  const { add } = useCurrentIcons();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  const pinnedTask = Tasks.filter((t) => t.id === pinnedTodo);
  const unPinnedTasks = Tasks.filter((t) => t.id !== pinnedTodo);

  const dispatch = useDispatch();
  const commonCls = "h-80 overflow-hidden";

  const renderTasks = (taskList: TaskType[]) =>
    taskList.map((task) => (
      <Paper
        key={task.id}
        sx={{
          backgroundColor:
            task.id === pinnedTodo ? "secondaryContainer.paper" : undefined,
        }}
        className={commonCls}>
        <Todo {...task} />
      </Paper>
    ));

  return (
    <div className="grid gap-3 grid-cols-1 p-3 overflow-auto sm:grid-cols-2 md:grid-cols-3">
      {renderTasks(pinnedTask)}
      {renderTasks(unPinnedTasks)}
      <Paper
        onClick={() => dispatch(addTask(""))}
        className={cn(commonCls, "flex-center group cursor-pointer")}>
        <div className="group-hover:scale-[6] scale-[3] transition-all">
          {add}
        </div>
      </Paper>
    </div>
  );
}

export default TodoPage;
