import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import Todo from ".";

function TodoWidget({ id }: { id: number }) {
  const { Tasks } = useSelector((state: StateType) => state.todo);
  const task = Tasks.find((p) => p.id === id);
  if (!task) return null;
  return <Todo {...task} />;
}

export default TodoWidget;
