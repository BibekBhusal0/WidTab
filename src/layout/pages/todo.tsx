import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import Todo from "../widgets/todo";

function TodoPage() {
  const { Tasks } = useSelector((state: StateType) => state.todo);

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Tasks.map((task) => (
        <>
          <Todo key={task.id} {...task} />
        </>
      ))}
    </div>
  );
}

export default TodoPage;
