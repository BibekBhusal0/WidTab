import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import Todo from "../widgets/todo";
import { Paper } from "@mui/material";

function TodoPage() {
  const { Tasks } = useSelector((state: StateType) => state.todo);

  return (
    <div className="grid gap-3 grid-cols-1 p-3 overflow-auto sm:grid-cols-2 md:grid-cols-3">
      {Tasks.map((task) => (
        <Paper key={task.id} className="h-80 overflow-hidden">
          <Todo {...task} />
        </Paper>
      ))}
    </div>
  );
}

export default TodoPage;
