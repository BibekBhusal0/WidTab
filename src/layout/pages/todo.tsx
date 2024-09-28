import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../widgets/todo";
import { Paper, useTheme } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { addTask } from "@/redux/slice/todo";

function TodoPage() {
  const {
    palette: {
      primaryContainer: { paper },
    },
  } = useTheme();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  const pinned = Tasks.filter((t) => t.id === pinnedTodo);
  const unPinned = Tasks.filter((t) => t.id !== pinnedTodo);

  const dispatch = useDispatch();
  return (
    <div className="grid gap-3 grid-cols-1 p-3 overflow-auto sm:grid-cols-2 md:grid-cols-3">
      {pinned.map((task) => (
        <Paper
          sx={{ background: paper }}
          key={task.id}
          className="h-80 overflow-hidden">
          <Todo {...task} />
        </Paper>
      ))}
      {unPinned.map((task) => (
        <Paper key={task.id} className="h-80 overflow-hidden">
          <Todo {...task} />
        </Paper>
      ))}
      <Paper
        onClick={() => dispatch(addTask(""))}
        className="flex-center group cursor-pointer h-80">
        <div className="group-hover:scale-[6] scale-[3] transition-all">
          <AddCircleOutlineRoundedIcon />
        </div>
      </Paper>
    </div>
  );
}

export default TodoPage;
