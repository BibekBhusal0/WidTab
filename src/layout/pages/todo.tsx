import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../widgets/todo";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { addTask } from "@/redux/slice/todo";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function TodoPage() {
  const {
    palette: {
      primaryContainer: { paper },
    },
  } = useTheme();
  const { add } = useCurrentIcons();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  const pinned = Tasks.filter((t) => t.id === pinnedTodo);
  const unPinned = Tasks.filter((t) => t.id !== pinnedTodo);

  const dispatch = useDispatch();
  const commonCls = "h-80 overflow-hidden";
  return (
    <div className="grid gap-3 grid-cols-1 p-3 overflow-auto sm:grid-cols-2 md:grid-cols-3">
      {pinned.map((task) => (
        <Paper sx={{ background: paper }} key={task.id} className={commonCls}>
          <Todo {...task} />
        </Paper>
      ))}
      {unPinned.map((task) => (
        <Paper key={task.id} className={commonCls}>
          <Todo {...task} />
        </Paper>
      ))}
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
