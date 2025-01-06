import Todo from ".";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { currentSpaceDeleteWidget } from "@/storage/layout";
import { useTodo } from "@/storage";

function TodoWidget({ id }: controlledWidgetValues) {
  const { Tasks } = useTodo();
  const deleteAction = () => currentSpaceDeleteWidget({ id, type: "todo" });

  const task = Tasks.find((p) => p.id === id);
  if (!task) {
    deleteAction();
    return null;
  }
  return <Todo {...task} />;
}

export default TodoWidget;
