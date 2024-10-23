import AddItem from "@/components/addItem";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { addTask } from "@/redux/slice/todo";
import { StateType } from "@/redux/store";
import { widgetDimensions } from "@/utils/getWidget";
import { getNextId } from "@/utils/next_id";
import { useDispatch, useSelector } from "react-redux";
import AllItemsList from "./allItemsList";

function AddTodo() {
  const dispatch = useDispatch();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  const layout = useCurrentLayout();
  const todoDimensions = widgetDimensions["todo"];
  const { minH, minW } = todoDimensions;
  const availablePosition = useAvailablePosition(minW, minH);
  if (!layout) return null;
  const { widgets } = layout;
  const presentTodos = widgets.filter(({ type }) => type === "todo");
  const presentTodosId = presentTodos.map(({ values: { id } }) => id);

  const addWidget = (id: number) => {
    if (!availablePosition || presentTodosId.includes(id)) return;
    dispatch(
      currentSpaceAddWidget({
        type: "todo",
        values: {
          id,
        },
        gridProps: {
          ...todoDimensions,
          ...availablePosition,
          i: `todo-${id}`,
        },
      })
    );
  };

  const addTodo = (title: string) => {
    if (!availablePosition) return;
    const newId = getNextId(Tasks.map(({ id }) => id));
    dispatch(addTask(title));
    addWidget(newId);
  };

  return (
    <div className="text-xl size-full">
      <AllItemsList
        addWidget={addWidget}
        items={Tasks}
        availablePosition={!!availablePosition}
        disabledId={presentTodosId}
        pinned={pinnedTodo}
      />

      <AddItem
        inputProps={{ label: "Todo title", placeholder: "Todo title" }}
        addButtonProps={{ children: "Add Todo", disabled: !availablePosition }}
        clickEvent={addTodo}
        word_limit={undefined}
      />
      {!availablePosition && (
        <div className="text-lg text-error-main pt-3">
          Not Enough Space For Todo
        </div>
      )}
    </div>
  );
}

export default AddTodo;
