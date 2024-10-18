import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useDispatch, useSelector } from "react-redux";
import {
  changeValue,
  deleteItem,
  changePinnedHabitTracker,
} from "@/redux/slice/habit-tracker";
import WidgetControls from "@/components/widgetControl";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import LoopIcon from "@mui/icons-material/Loop";
import { BsPinAngleFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { StateType } from "@/redux/store";
import IconMenu from "@/components/menuWithIcon";
import HoverControls from "@/components/hoverControls";

function HabitTracker({
  id,
  target,
  title,
  value,
  icon,
  unit,
}: HabitTrackerItemType) {
  const dispatch = useDispatch();
  const { pinned } = useSelector((state: StateType) => state["habit-tracker"]);
  const handlePin = () => {
    dispatch(changePinnedHabitTracker(id));
  };
  const handleDelete = () => {
    dispatch(deleteItem(id));
  };
  const handleIncrement = () => {
    dispatch(changeValue({ id, action: "increment" }));
  };
  const handleDecrement = () => {
    dispatch(changeValue({ id, action: "decrement" }));
  };
  const handleReset = () => {
    dispatch(changeValue({ id, action: "reset" }));
  };
  const icons = [
    { icon: <RemoveIcon />, onClick: handleDecrement },
    { icon: <AddIcon />, onClick: handleIncrement },
  ];
  const completedToday = value >= target;

  return (
    <HoverControls
      controls={
        <HabitTrackerControls
          handleDelete={handleDelete}
          handlePin={handlePin}
          handleReset={handleReset}
          pinned={pinned === id}
        />
      }
      className="flex-center flex-col gap-4 p-2 w-full">
      <div className="between w-full gap-4">
        <div className="w-28 bg-white h-16 text-4xl flex-center">{icon}</div>
        <Box className="text-4xl">{title}</Box>
        <div></div>
      </div>

      <Box className="between gap-4 w-full">
        <Box className="between gap-4">
          <Box className="flex-center gap-4">
            <Box
              className="flex-center gap-2 p-1.5 rounded-xl"
              sx={{ border: "2px solid" }}>
              <Box
                sx={{ border: `2px ${completedToday ? "solid" : "dashed"}` }}
                className="aspect-square w-10 rounded-full relative p-0.5">
                {completedToday && (
                  <FaFire style={{ width: "100%", height: "100%" }} />
                )}
              </Box>
              0
            </Box>
          </Box>
        </Box>
        <Box className="flex-center flex-col gap-2">
          <div>
            <span className="text-3xl">
              {value} / {target}
            </span>
            <span className="text-md">
              {"  "}
              {unit}
            </span>
          </div>
        </Box>
        <Box>
          {icons.map(({ icon, onClick }, index) => (
            <Button
              key={index}
              onClick={onClick}
              sx={{ padding: "4px", margin: "2px", minWidth: "0" }}
              variant="outlined">
              {icon}
            </Button>
          ))}
        </Box>
      </Box>
    </HoverControls>
  );
}

function HabitTrackerControls({
  handleReset,
  handlePin,
  handleDelete,
  pinned,
}: {
  handleReset: () => void;
  pinned?: boolean;
  handlePin: () => void;
  handleDelete: () => void;
}) {
  const items = [
    {
      name: pinned ? "Unpin" : "Pin",
      Icon: <BsPinAngleFill />,
      onClick: handlePin,
      color: pinned ? "primary.main" : "action.main",
    },

    {
      name: "Delete",
      Icon: <DeleteIcon />,
      onClick: handleDelete,
      color: "error.main",
    },
    { name: "Reset", Icon: <LoopIcon />, onClick: handleReset },
  ];
  return (
    <WidgetControls>
      <IconMenu menuItems={items} />
    </WidgetControls>
  );
}

export default HabitTracker;
