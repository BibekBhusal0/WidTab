import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import Todo from "../widgets/todo";
import { Paper } from "@mui/material";

function TodoPage() {
  const { Tasks } = useSelector((state: StateType) => state.todo);

  return (
    <div className="grid gap-3 grid-cols-1 p-3 overflow-auto sm:grid-cols-2 md:grid-cols-3 h-80">
      {Tasks.map((task) => (
        <Paper>
          <Todo key={task.id} {...task} />
        </Paper>
      ))}
    </div>
  );
}

export default TodoPage;
