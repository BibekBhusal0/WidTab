import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { useState } from "react";
import Button from "@mui/material/Button";
import HabitTrackerEdit from "./edit";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import Popover from "@mui/material/Popover";
import HabitTrackerStatsSingle from "./stats/single";
import { ControlPropsDifferentForContextMenu } from "../controls";
import { useHabitTracker, useLayout } from "@/storage";
import {
  changePinnedHabitTracker,
  changeValue,
  deleteTracker,
  setTrackerItem,
} from "@/storage/habit-tracker";
import { currentSpaceDeleteWidget } from "@/storage/layout";

function HabitTrackerControls({
  id,
  contextMenu = false,
}: ControlPropsDifferentForContextMenu) {
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

  const { pinned, trackers } = useHabitTracker();
  const { currentSpace } = useLayout();
  const handlePin = () => changePinnedHabitTracker(id);

  const handleDelete = () => {
    if (currentSpace.type === "dynamic") {
      currentSpaceDeleteWidget({ id, type: "habit-tracker" });
    } else {
      deleteTracker(id);
    }
  };
  const handleReset = () => changeValue(id, "reset");

  const handleChange = (tracker: HabitTrackerItemType) => {
    setTrackerItem(tracker);
    setEditing(false);
  };

  const Pinned: IconMenuType[] = [
    {
      name: pinned === id ? "Unpin" : "Pin",
      icon: pin,
      onClick: handlePin,
      color: pinned === id ? "primary.main" : "action.main",
    },
  ];
  const StatsEdit: IconMenuType[] = [
    {
      name: "Stats",
      icon: "proicons:graph",
      onClick: handleStatsOpen,
      color: statsOpen ? "primary.main" : "action.main",
    },

    { name: "Edit", icon: edit, onClick: () => setEditing(true) },
  ];
  const resetDelete: IconMenuType[] = [
    { name: "Reset", icon: reset, onClick: handleReset },
    {
      name: "Delete",
      icon: delete_,
      onClick: handleDelete,
      color: "error.main",
    },
  ];
  const items: IconMenuType[] = [...Pinned];
  if (!contextMenu) items.push(...StatsEdit);
  items.push(...resetDelete);

  return (
    <>
      {editing && !contextMenu ? (
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
          {!contextMenu && (
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
          )}
        </div>
      )}
    </>
  );
}

function Stats({ id }: { id: number }) {
  const { trackers } = useHabitTracker();
  const currentHabitTracker = trackers.find((tracker) => tracker.id === id);
  if (!currentHabitTracker) return null;
  return (
    <div className="size-[400px]">
      <HabitTrackerStatsSingle {...currentHabitTracker} />
    </div>
  );
}

export default HabitTrackerControls;
