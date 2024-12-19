import dayjs from "@/dayjsConfig";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { PieChart, Pie, Cell } from "recharts";

const pgt = ["daily", "weekly", "monthly"] as const;
export type progressGraphType = (typeof pgt)[number];
export const allProgressGraphTypes: progressGraphType[] = [...pgt];

export type ProgressGraphProps = {
  type?: progressGraphType;
  trackers: HabitTrackerItemType[];
};

function ProgressGraph({ type = "daily", trackers }: ProgressGraphProps) {
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
  const data = [
    { name: "completed", value: completionPercentage },
    { name: "remaining", value: 100 - completionPercentage },
  ];
  const pieProps = {
    width: 100,
    height: 100,
    innerRadius: 35,
    outerRadius: 43,
    startAngle: 90,
    endAngle: -270,
  };

  return (
    <div className="relative size-[100px]">
      <PieChart {...pieProps}>
        <Pie
          data={data}
          dataKey={"value"}
          fill="var(--mui-palette-success-main)"
          {...pieProps}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                index === 0
                  ? "var(--mui-palette-success-main)"
                  : "var(--mui-palette-divider)"
              }
              stroke="none"
            />
          ))}
        </Pie>
      </PieChart>
      <div className="text-center flex-center absolute-center text-lg">{`${Math.round(
        completionPercentage
      )}%`}</div>
    </div>
  );
}

export default ProgressGraph;
