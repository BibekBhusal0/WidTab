import dayjs from "@/dayjsConfig";
import useCurrentTheme from "@/hooks/useCurrentTheme";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const pgt = ["daily", "weekly", "monthly"] as const;
export type progressGraphType = (typeof pgt)[number];
export const allProgressGraphTypes: progressGraphType[] = [...pgt];

export type ProgressGraphProps = {
  type?: progressGraphType;
  trackers: HabitTrackerItemType[];
};

function ProgressGraph({ type = "daily", trackers }: ProgressGraphProps) {
  const { roundness } = useCurrentTheme();
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
  const completionString = `${Math.round(completionPercentage)}%`;
  const chart = {
    width: 100,
    height: 100,
    innerRadius: 34,
    outerRadius: 47,
    startAngle: 90,
    endAngle: -270,
  };
  return (
    <div className="relative size-[100px]">
      <RadialBarChart data={[{ value: completionPercentage }]} {...chart}>
        <PolarAngleAxis
          angleAxisId={0}
          domain={[0, 100]}
          tick={false}
          type="number"
        />
        <RadialBar
          dataKey="value"
          fill="var(--mui-palette-primary-main)"
          background={{ fill: "var(--mui-palette-divider)" }}
          cornerRadius={roundness * 10}
          isAnimationActive={false}
          {...chart}
        />
      </RadialBarChart>

      <div className="text-center absolute-center text-lg">
        {completionString}
      </div>
    </div>
  );
}

export default ProgressGraph;
