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
import Popover from "@mui/material/Popover";
import HabitTrackerStatsSingle from "./stats/single";

function HabitTrackerControls({ id }: { id: number }) {
  const [editing, setEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const statsOpen = !!anchorEl;
  const handleStatsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatsClose = () => {
    setAnchorEl(null);
  };
  const { delete_, reset, pin, edit } = useCurrentIcons();

  const dispatch = useDispatch();
  const { pinned, trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const handlePin = () => dispatch(changePinnedHabitTracker(id));

  const handleDelete = () => {
    if (currentSpace.type === "dynamic") {
      dispatch(currentSpaceDeleteWidget({ id, type: "habit-tracker" }));
    } else {
      dispatch(deleteItem(id));
    }
  };
  const handleReset = () => dispatch(changeValue({ id, action: "reset" }));

  const handleChange = (tracker: HabitTrackerItemType) => {
    dispatch(setItem(tracker));
    setEditing(false);
  };

  const items: IconMenuType[] = [
    {
      name: pinned === id ? "Unpin" : "Pin",
      icon: pin,
      onClick: handlePin,
      color: pinned === id ? "primary.main" : "action.main",
    },
    {
      name: "Stats",
      icon: "proicons:graph",
      onClick: handleStatsOpen,
      color: statsOpen ? "primary.main" : "action.main",
    },

    { name: "Edit", icon: edit, onClick: () => setEditing(true) },
    { name: "Reset", icon: reset, onClick: handleReset },
    {
      name: "Delete",
      icon: delete_,
      onClick: handleDelete,
      color: "error.main",
    },
  ];
  return (
    <MenuPopover>
      {editing ? (
        <div className="p-4">
          <HabitTrackerEdit
            initialState={trackers.find((tracker) => tracker.id === id)}
            onChange={handleChange}
          />
          <div className="w-full flex-center mt-5">
            <Button onClick={() => setEditing(false)}>Back</Button>
          </div>
        </div>
      ) : (
        <div>
          <IconMenu menuItems={items} />
          <Popover
            anchorEl={anchorEl}
            marginThreshold={30}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={statsOpen}
            onClose={handleStatsClose}>
            <Stats id={id} />
          </Popover>
        </div>
      )}
    </MenuPopover>
  );
}

function Stats({ id }: { id: number }) {
  const { trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const currentHabitTracker = trackers.find((tracker) => tracker.id === id);
  if (!currentHabitTracker) return null;
  return (
    <div className="size-[400px]">
      <HabitTrackerStatsSingle {...currentHabitTracker} />
    </div>
  );
}

export default HabitTrackerControls;
