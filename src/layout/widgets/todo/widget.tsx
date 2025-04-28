import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Todo from ".";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

function TodoWidget({ id }: controlledWidgetValues) {
  const dispatch = useDispatch();
  const { Tasks } = useSelector((state: StateType) => state.todo);
  const deleteAction = () => dispatch(currentSpaceDeleteWidget({ id, type: "todo" }));

  const task = Tasks.find((p) => p.id === id);
  if (!task) {
    deleteAction();
    return null;
  }
  return <Todo {...task} />;
}

export default TodoWidget;
