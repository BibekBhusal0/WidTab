import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import dayjs from "@/dayjsConfig";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useTheme } from "@mui/material/styles";

export type BarGraphProps = {
  data: {
    date: string;
    value: number;
  }[];
  size: { width: number; height: number };
  showTarget?: boolean;
} & HabitTrackerItemType;

function BarGraph({
  unit,
  title,
  target,
  data,
  size,
  showTarget = true,
}: BarGraphProps) {
  const {
    palette: { error, success },
  } = useTheme();

  const weekly = data.length === 7;

  return (
    <ResponsiveChartContainer
      title={title}
      dataset={data}
      series={[{ type: "bar", dataKey: "value" }]}
      xAxis={[
        {
          dataKey: "date",
          valueFormatter(value: string) {
            return weekly
              ? dayjs(value).format("ddd")
              : `${dayjs(value).format("MMM")}\n ${dayjs(value).format("DD")}`;
          },
          scaleType: "band",
          id: "date",
        },
      ]}
      yAxis={[
        {
          label: `${unit}`,
          min: 0,
          max: Math.max(target, ...data.map((d) => d.value)),
          colorMap: {
            type: "piecewise",
            thresholds: [target],
            colors: [error.main, success.main],
          },
          id: "value",
        },
      ]}
      height={size.height - 20}
      width={size.width - 10}>
      <BarPlot borderRadius={10} />
      {showTarget && (
        <ChartsReferenceLine
          y={target}
          lineStyle={{ strokeDasharray: "10 5" }}
          labelStyle={{ fontSize: "10" }}
          label={`target`}
          labelAlign="end"
        />
      )}
      <ChartsXAxis axisId="date" position="bottom" />
      <ChartsYAxis axisId="value" position="left" />
    </ResponsiveChartContainer>
  );
}

export default BarGraph;
