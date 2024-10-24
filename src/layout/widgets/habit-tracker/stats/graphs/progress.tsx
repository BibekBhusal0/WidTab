import dayjs from "@/dayjsConfig";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { Gauge, GaugeProps } from "@mui/x-charts/Gauge";

const pgt = ["daily", "weekly", "monthly"] as const;
export type progressGraphType = (typeof pgt)[number];
export const allProgressGraphTypes: progressGraphType[] = [...pgt];

export type ProgressGraphProps = {
  type?: progressGraphType;
  trackers: HabitTrackerItemType[];
} & GaugeProps;

function ProgressGraph({
  type = "daily",
  trackers,
  ...props
}: ProgressGraphProps) {
  const calculateCompletionPercentage = () => {
    const entryDate = dayjs();
    let startDate = entryDate.clone();
    let endDate = entryDate.clone();

    if (type === "weekly") {
      startDate = entryDate.startOf("week");
      endDate = entryDate.endOf("week");
    } else if (type === "monthly") {
      startDate = entryDate.startOf("month");
      endDate = entryDate.endOf("month");
    }

    let currentDate = startDate.clone();
    const completionPercentages: number[] = [];

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      trackers.forEach((tracker) => {
        if (tracker.history) {
          const formattedDate = currentDate.format("YYYY-MM-DD");
          const value = tracker.history[formattedDate] || 0;
          const completion =
            tracker.target === 0
              ? 0
              : Math.min((value / tracker.target) * 100, 100);
          completionPercentages.push(completion);
        } else completionPercentages.push(0);
      });
      currentDate = currentDate.add(1, "day");
    }

    const averagePercentage =
      completionPercentages.length > 0
        ? completionPercentages.reduce((sum, percent) => sum + percent, 0) /
          completionPercentages.length
        : 0;
    return averagePercentage;
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <Gauge
      width={100}
      height={100}
      text={({ value }) => `${value?.toFixed(0)} %`}
      {...props}
      value={completionPercentage}
      valueMax={100}
    />
  );
}

export default ProgressGraph;
