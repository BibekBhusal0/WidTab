import { BarChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useTheme } from "@mui/material/styles";

export const generateCompleteData = (
  history: Record<string, number>,
  startDate: string,
  endDate: string
) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const data: { date: string; value: number }[] = [];
  for (
    let date = start;
    date.isBefore(end) || date.isSame(end);
    date = date.add(1, "day")
  ) {
    const formattedDate = date.format("YYYY-MM-DD");
    data.push({
      date: formattedDate,
      value: history[formattedDate] || 0,
    });
  }

  return data;
};

function HabitTrackerStatsSingle({
  unit,
  title,
  target,
  history = {},
}: HabitTrackerItemType) {
  const {
    palette: { error, success },
  } = useTheme();
  const startDate = "2024-10-15";
  const endDate = "2024-10-23";

  const completeData = generateCompleteData(history, startDate, endDate);

  return (
    <div className="p-4 shadow-lg">
      <h6 className="mb-2 text-center">{title} Stats</h6>
      <BarChart
        dataset={completeData}
        series={[{ dataKey: "value" }]}
        xAxis={[
          {
            dataKey: "date",
            valueFormatter(value: string) {
              return dayjs(value).format("MMM DD");
            },
            scaleType: "band",
            label: "Date",
          },
        ]}
        yAxis={[
          {
            label: `${unit}`,
            colorMap: {
              type: "piecewise",
              thresholds: [target],
              colors: [error.main, success.main],
            },
          },
        ]}
        height={250}
      />
    </div>
  );
}

export default HabitTrackerStatsSingle;
