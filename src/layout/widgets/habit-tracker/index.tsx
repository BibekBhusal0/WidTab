import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useDispatch, useSelector } from "react-redux";
import {
  changeValue,
  deleteItem,
  changePinnedHabitTracker,
} from "@/redux/slice/habit-tracker";
import WidgetControls from "@/components/widgetControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StateType } from "@/redux/store";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import HoverControls from "@/components/hoverControls";
import { Icon } from "@iconify/react";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import MenuPopover from "@/components/popoverMenu";
import { cn } from "@/utils/cn";

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
    { icon: "material-symbols:remove", onClick: handleDecrement },
    { icon: "material-symbols:add-2-rounded", onClick: handleIncrement },
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
                  <Icon className="size-full" icon="heroicons:fire-16-solid" />
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
          {icons.map(({ icon, onClick }, index) => {
            const add = icon.includes("add");
            const disabled = !add && value <= 0;
            return (
              <Button
                key={index}
                onClick={onClick}
                sx={{ padding: "4px", margin: "2px", minWidth: "0" }}
                variant="outlined"
                disabled={disabled}>
                {
                  <Icon
                    icon={icon}
                    className={cn({ "text-4xl": add, "text-2xl": !add })}
                  />
                }
              </Button>
            );
          })}
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
  const { delete_, reset, pin } = useCurrentIcons();
  const items: IconMenuType[] = [
    {
      name: pinned ? "Unpin" : "Pin",
      icon: pin,
      onClick: handlePin,
      color: pinned ? "primary.main" : "action.main",
    },

    {
      name: "Delete",
      icon: delete_,
      onClick: handleDelete,
      color: "error.main",
    },
    { name: "Reset", icon: reset, onClick: handleReset },
  ];
  return (
    <WidgetControls>
      <MenuPopover>
        <IconMenu menuItems={items} />
      </MenuPopover>
    </WidgetControls>
  );
}

export default HabitTracker;
