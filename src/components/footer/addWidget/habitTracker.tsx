import Button from "@mui/material/Button";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { widgetDimensions } from "@/utils/getWidget";
import { getNextId } from "@/utils/next_id";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import { addItem } from "@/redux/slice/habit-tracker";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import HabitTrackerEdit from "@/layout/widgets/habit-tracker/edit";
import { useState } from "react";
import { Icon } from "@iconify/react";

function AddHabitTracer() {
  const dispatch = useDispatch();
  const { trackers, pinned } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const dimensions = widgetDimensions["habit-tracker"];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);
  const layout = useCurrentLayout();
  const { pin } = useCurrentIcons();

  if (!layout) return null;
  const { widgets } = layout;
  const presentTodos = widgets.filter(({ type }) => type === "habit-tracker");
  const presentTodosId = presentTodos.map(({ values: { id } }) => id);

  const addWidget = (id: number) => {
    if (!availablePosition || presentTodosId.includes(id)) return;
    dispatch(
      currentSpaceAddWidget({
        type: "habit-tracker",
        values: {
          id,
        },
        gridProps: {
          ...dimensions,
          ...availablePosition,
          i: `habit-tracker-${id}`,
        },
      })
    );
  };

  const addHabitTracker = (tracker: HabitTrackerItemType) => {
    if (!availablePosition) return;
    const newId = getNextId(trackers.map(({ id }) => id));
    dispatch(addItem(tracker));
    addWidget(newId);
  };

  return (
    <div className="text-xl size-full">
      <List>
        {trackers.map(({ id, title }) => (
          <ListItemButton
            sx={{ justifyContent: "space-between" }}
            disabled={!availablePosition || presentTodosId.includes(id)}
            key={id}
            onClick={() => addWidget(id)}
            //
          >
            {title}
            {id === pinned && pin}
          </ListItemButton>
        ))}
      </List>
      <AddNewHabitTracker
        addHabitTracker={addHabitTracker}
        disabled={!availablePosition}
      />
      {!availablePosition && (
        <div className="text-lg text-error-main pt-3">
          Not Enough Space For Habit Tacker
        </div>
      )}
    </div>
  );
}

function AddNewHabitTracker({
  addHabitTracker,
  disabled = false,
}: {
  addHabitTracker: (tracker: HabitTrackerItemType) => void;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex-center flex-col gap-4 w-full mt-5">
      {show && (
        <HabitTrackerEdit
          onChange={(tracker) => {
            addHabitTracker(tracker);
            setShow(false);
          }}
          buttonProps={{ children: "Add", disabled }}
        />
      )}
      <Button
        onClick={() => setShow(!show)}
        variant="outlined"
        color={show ? "error" : "primary"}
        startIcon={
          <Icon icon={`material-symbols:${show ? "arrow-back" : "add"}`} />
        }
        children={show ? "Back" : "Add New Habit Tracker"}
        disabled={disabled}
      />
    </div>
  );
}

export default AddHabitTracer;
