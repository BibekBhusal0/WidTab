import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import Todo from ".";
import { controlledWidgetValues } from "@/types/slice/widgets";

function TodoWidget({ id, deleteAction }: controlledWidgetValues) {
  const { Tasks } = useSelector((state: StateType) => state.todo);
  const task = Tasks.find((p) => p.id === id);
  if (!task) return null;
  return <Todo {...task} deleteAction={deleteAction} />;
}

export default TodoWidget;
