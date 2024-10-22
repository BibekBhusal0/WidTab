import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useDispatch } from "react-redux";
import { changeValue } from "@/redux/slice/habit-tracker";
import Button from "@mui/material/Button";
import HoverControls from "@/components/hoverControls";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import HabitTrackerControls from "./controls";

function HabitTracker({
  id,
  target,
  title,
  value,
  icon,
  unit,
}: HabitTrackerItemType) {
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(changeValue({ id, action: "increment" }));
  };
  const handleDecrement = () => {
    dispatch(changeValue({ id, action: "decrement" }));
  };
  const icons = [
    { icon: "material-symbols:remove", onClick: handleDecrement },
    { icon: "material-symbols:add-2-rounded", onClick: handleIncrement },
  ];
  const completedToday = value >= target;

  return (
    <HoverControls
      controls={<HabitTrackerControls id={id} />}
      className="flex-center flex-col gap-4 p-2 w-full">
      <div aria-label="icon and title" className="full-between">
        <div className="w-16 bg-primaryContainer-default rounded-full aspect-square p-2">
          <Icon icon={icon} className="size-full" />
        </div>
        <div className="text-4xl">{title}</div>
        <div></div>
      </div>

      <div aria-label="streak, progress and buttons" className="full-between">
        <div aria-label="streak" className="between gap-4">
          <div className="flex-center gap-4">
            <div className="flex-center gap-2 p-1.5 rounded-xl border-text-primary border-2">
              <div
                className={cn(
                  "aspect-square w-10 relative p-0.5 transition-all",
                  "rounded-full border-text-primary border-2",
                  {
                    "border-solid": completedToday,
                    "border-dashed": !completedToday,
                  }
                )}>
                {completedToday && (
                  <Icon className="size-full" icon="heroicons:fire-16-solid" />
                )}
              </div>
              0
            </div>
          </div>
        </div>
        <div aria-label="progress" className="flex-center flex-col gap-2">
          <div>
            <span className="text-3xl">
              {value} / {target}
            </span>
            <span className="text-md">
              {"  "}
              {unit}
            </span>
          </div>
        </div>
        <div aria-label="buttons">
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
        </div>
      </div>
    </HoverControls>
  );
}

export default HabitTracker;
