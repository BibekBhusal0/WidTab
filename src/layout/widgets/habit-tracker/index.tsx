import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useDispatch, useSelector } from "react-redux";
import {
  changeValue,
  deleteItem,
  changePinnedHabitTracker,
} from "@/redux/slice/habit-tracker";
import WidgetControls from "@/components/widgetControl";
import MenuPopover from "@/components/popoverMenu";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import LoopIcon from "@mui/icons-material/Loop";
import { BsPinAngleFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { Box, Button, IconButton, ListItemIcon, MenuItem } from "@mui/material";
import { StateType } from "@/redux/store";

function HabitTracker({
  completedToday,
  id,
  streak,
  target,
  title,
  tag,
  value,
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

  return (
    <Box className="flex-center flex-col gap-4 p-2 w-full">
      <Box className="between gap-4 w-full">
        <Box className="flex-center gap-4">
          <Box
            className="flex-center gap-2 p-1.5 rounded-xl"
            sx={{ border: "2px solid" }}>
            <Box
              sx={{ border: `2px ${completedToday ? "solid" : "dashed"}` }}
              className="aspect-square w-10 rounded-full">
              {completedToday ? <FaFire /> : ""}
            </Box>
            {streak}
          </Box>

          {tag && (
            <Box className="rounded-xl py-2 px-3" sx={{ border: "1px solid" }}>
              {tag}
            </Box>
          )}
        </Box>
        <HabitTrackerControls
          handleDelete={handleDelete}
          handlePin={handlePin}
          handleReset={handleReset}
          pinned={pinned === id}
        />
      </Box>
      <Box className="between gap-4 w-full">
        <div className="w-28 bg-white h-16"></div>
        <Box className="flex-center flex-col gap-2">
          <Box className="text-3xl">
            {value} / {target}
          </Box>
          <Box className="text-md">{title}</Box>
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
    </Box>
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
      Icon: BsPinAngleFill,
      onClick: handlePin,
      color: pinned ? "primary.main" : "action.main",
    },

    {
      name: "Delete",
      Icon: DeleteIcon,
      onClick: handleDelete,
      color: "error.main",
    },
  ];
  return (
    <WidgetControls className="relative flex-center">
      <IconButton onClick={handleReset}>
        <LoopIcon />
      </IconButton>
      <MenuPopover>
        {items.map(({ name, Icon, onClick, color }) => (
          <MenuItem
            sx={{ color: color }}
            className="flex-center gap-3"
            key={name}
            onClick={onClick}>
            <ListItemIcon sx={{ color: color }}>
              <Icon />
            </ListItemIcon>
            <Box sx={{ color: color }} className="text-xl">
              {name}
            </Box>
          </MenuItem>
        ))}
      </MenuPopover>
    </WidgetControls>
  );
}

export default HabitTracker;
