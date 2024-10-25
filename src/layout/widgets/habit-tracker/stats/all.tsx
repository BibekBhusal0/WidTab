import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import dayjs from "@/dayjsConfig";
import useFullSize from "@/hooks/useFullSize";
import Button, { ButtonProps } from "@mui/material/Button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SimpleWidget from "../../simpleWidget";
import { controlledWidgetValues } from "@/types/slice/widgets";
import CommitGraph from "./graphs/commit";
import ProgressGraph, { allProgressGraphTypes } from "./graphs/progress";

function HabitTrackerStatsAll() {
  const { trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const { ref, size } = useFullSize();
  const weekThreshold = 500;
  const monthThreshold = 1200;
  const weekly = size.width < weekThreshold;
  const monthly = monthThreshold <= size.width;

  const [currentDate, setCurrentDate] = useState(dayjs());

  const getDataPointCount = () => {
    if (size.width < weekThreshold) return 7;
    else if (monthly) return 30;
    else {
      const scaledCount = Math.round(
        7 +
          ((size.width - weekThreshold) / (monthThreshold - weekThreshold)) *
            (30 - 7)
      );
      return Math.max(7, Math.min(scaledCount, 30));
    }
  };

  const dataPointCount = getDataPointCount();

  let startDate;
  let endDate;

  if (monthly) {
    startDate = currentDate.startOf("month");
    endDate = currentDate.endOf("month");
  } else {
    startDate = weekly
      ? currentDate.startOf("week")
      : currentDate.subtract(dataPointCount - 1, "days").startOf("day");
    endDate = weekly ? currentDate.endOf("week") : currentDate.add(2, "days");
  }

  const handleChangePeriod = (direction: "previous" | "next") => {
    setCurrentDate((prev: dayjs.Dayjs) => {
      const d = direction === "next" ? 1 : -1;
      const increment = (monthly ? 1 : dataPointCount) * d;

      return prev.add(increment, monthly ? "month" : "days");
    });
  };

  const isCurrentPeriod = () => {
    const now = dayjs();
    return now.isBetween(startDate, endDate, null, "[]");
  };

  const btnProps: ButtonProps = { variant: "text", size: "small" };
  const gaugeHeight = 150;

  return (
    <div ref={ref} className="size-full p-2 flex flex-col gap-2">
      {trackers.length === 0 ? (
        <div className="text-xl text-center">No Habit Tracker</div>
      ) : (
        <div className="flex size-full gap-2">
          <div>
            <div aria-label="title-and-buttons" className="full-between px-3">
              <Button
                {...btnProps}
                onClick={() => handleChangePeriod("previous")}
                startIcon={<Icon icon="bi:arrow-left" />}>
                Previous
              </Button>
              <div>
                {startDate.format("MMM D, YYYY")} -{" "}
                {endDate.format("MMM D, YYYY")}
              </div>
              <Button
                {...btnProps}
                onClick={() => handleChangePeriod("next")}
                endIcon={<Icon icon="bi:arrow-right" />}
                disabled={isCurrentPeriod()}>
                Next
              </Button>
            </div>
            <CommitGraph {...{ trackers, startDate, endDate }} />{" "}
          </div>
          {monthly && size.height > gaugeHeight && (
            <div className="border-l-2 border-l-divider flex items-center flex-col size-full px-[6px]">
              <div className="text-xl">Progress</div>
              <div className="flex flex-col justify-around size-full">
                {allProgressGraphTypes.map((type, i) => {
                  if (size.height > gaugeHeight * (i + 1)) {
                    return (
                      <div className="flex-center flex-col">
                        <ProgressGraph type={type} trackers={trackers} />
                        <div className="capitalize">{type}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HabitTrackerStatsAll;

export function HabitTrackerStatsAllWidget({ id }: controlledWidgetValues) {
  return (
    <SimpleWidget type="habit-tracker-stats-all" id={id}>
      <HabitTrackerStatsAll />
    </SimpleWidget>
  );
}
