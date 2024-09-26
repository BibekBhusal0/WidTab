import useCurrentLayout from "@/hooks/useCurrentLayout";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { findNextAvailablePosition } from "@/utils/findWidgetPosition";
import { widgetDimensions } from "@/utils/getWidget";
import { List, ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function AddTodo() {
  const dispatch = useDispatch();
  const crrLayout = useCurrentLayout();
  const { n_cols, n_rows } = useSelector((state: StateType) => state.layout);
  const { Tasks } = useSelector((state: StateType) => state.todo);
  if (!crrLayout) return null;
  const todoDimensions = widgetDimensions["todo"];
  const { minH, minW } = todoDimensions;
  const availablePosition = findNextAvailablePosition(
    crrLayout.widgets,
    n_cols,
    n_rows,
    minW,
    minH
  );
  const handleClick = (id: number) => {
    if (!availablePosition) return;
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

  return (
    <div className="text-xl size-full">
      <List>
        {Tasks.map(({ id, title }) => (
          <ListItemButton
            disabled={!availablePosition}
            key={id}
            onClick={() => handleClick(id)}
            //
          >
            {title}
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

export default AddTodo;
