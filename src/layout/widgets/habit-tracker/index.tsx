import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useDispatch } from "react-redux";
import { changeValue } from "@/redux/slice/habit-tracker";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";

function HabitTracker({ id, target, title, icon, unit, history = {} }: HabitTrackerItemType) {
  const value = history[dayjs().format("YYYY-MM-DD")] || 0;
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

  const calculateStreak = () => {
    let streak = 0;
    let currentDate = dayjs().subtract(1, "day");

    while (true) {
      const date = currentDate.format("YYYY-MM-DD");
      if (history[date] >= target) {
        streak++;
        currentDate = currentDate.subtract(1, "day");
      } else break;
    }

    return streak;
  };

  const streak = calculateStreak() + Number(completedToday);

  return (
    <>
      <div aria-label="icon and title" className="full-between">
        <div className="bg-primary-container-default aspect-square w-16 rounded-full p-2">
          <Icon icon={icon} className="size-full" />
        </div>
        <div className="text-4xl">{title}</div>
        <div></div>
      </div>

      <div aria-label="streak, progress and buttons" className="full-between">
        <div aria-label="streak" className="between gap-4">
          <div className="flex-center gap-4">
            <div className="flex-center border-text-primary gap-2 rounded-xl border-2 p-1.5">
              <div
                className={cn(
                  "relative aspect-square w-10 p-0.5 transition-all",
                  "border-text-primary rounded-full border-2",
                  {
                    "border-solid": completedToday,
                    "border-dashed": !completedToday,
                  }
                )}>
                {completedToday && <Icon className="size-full" icon="heroicons:fire-16-solid" />}
              </div>
              {streak}
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
                {<Icon icon={icon} className={cn({ "text-4xl": add, "text-2xl": !add })} />}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HabitTracker;
