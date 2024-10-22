import WidgetControls from "@/components/widgetControl";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import MenuPopover from "@/components/popoverMenu";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import {
  changePinnedHabitTracker,
  changeValue,
  deleteItem,
  setItem,
} from "@/redux/slice/habit-tracker";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import { useState } from "react";
import Button from "@mui/material/Button";
import HabitTrackerEdit from "./edit";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";

function HabitTrackerControls({ id }: { id: number }) {
  const [editing, setEditing] = useState(false);
  const { delete_, reset, pin, edit } = useCurrentIcons();

  const dispatch = useDispatch();
  const { pinned, trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const handlePin = () => {
    dispatch(changePinnedHabitTracker(id));
  };
  const handleDelete = () => {
    if (currentSpace.type === "dynamic") {
      dispatch(currentSpaceDeleteWidget({ id, type: "habit-tracker" }));
    } else {
      dispatch(deleteItem(id));
    }
  };
  const handleReset = () => {
    dispatch(changeValue({ id, action: "reset" }));
  };

  const handleChange = (tracker: HabitTrackerItemType) => {
    dispatch(setItem(tracker));
    setEditing(false);
  };
  const items: IconMenuType[] = [
    { name: "Edit", icon: edit, onClick: () => setEditing(true) },
    {
      name: pinned === id ? "Unpin" : "Pin",
      icon: pin,
      onClick: handlePin,
      color: pinned === id ? "primary.main" : "action.main",
    },

    { name: "Reset", icon: reset, onClick: handleReset },
    {
      name: "Delete",
      icon: delete_,
      onClick: handleDelete,
      color: "error.main",
    },
  ];
  return (
    <WidgetControls>
      <MenuPopover>
        {editing ? (
          <div className="p-4">
            <HabitTrackerEdit
              initialState={trackers.find(({ id }) => id === id)}
              onChange={handleChange}
            />
            <div className="w-full flex-center mt-5">
              <Button onClick={() => setEditing(false)}>Back</Button>
            </div>
          </div>
        ) : (
          <IconMenu menuItems={items} />
        )}
      </MenuPopover>
    </WidgetControls>
  );
}

export default HabitTrackerControls;
