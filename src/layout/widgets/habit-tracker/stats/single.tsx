import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import dayjs from "@/dayjsConfig";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { useTheme } from "@mui/material/styles";
import useFullSize from "@/hooks/useFullSize";
import Button, { ButtonProps } from "@mui/material/Button";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const { ref, size } = useFullSize();
  const weekly = size.width < 800;

  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDate = weekly
    ? currentDate.startOf("week")
    : currentDate.startOf("month");
  const endDate = weekly
    ? currentDate.endOf("week")
    : currentDate.endOf("month");

  const completeData = generateCompleteData(
    history,
    startDate.format("YYYY-MM-DD"),
    endDate.format("YYYY-MM-DD")
  );

  const handlePrevious = () => {
    setCurrentDate((prev: dayjs.Dayjs) =>
      weekly ? prev.subtract(1, "week") : prev.subtract(1, "month")
    );
  };

  const handleNext = () => {
    setCurrentDate((prev: dayjs.Dayjs) =>
      weekly ? prev.add(1, "week") : prev.add(1, "month")
    );
  };

  const isCurrentPeriod = () => {
    const now = dayjs();
    return weekly
      ? currentDate.isSame(now, "week")
      : currentDate.isSame(now, "month");
  };

  const btnProps: ButtonProps = {
    variant: "text",
    size: "small",
    className: "flex-center gap-3",
  };
  return (
    <div className="size-full p-2">
      <div className="size-full flex-center flex-col gap-2" ref={ref}>
        <div className="full-between px-3">
          <Button {...btnProps} onClick={handlePrevious}>
            <Icon icon="bi:arrow-left" />
            Previous
          </Button>
          <h6>{title}</h6>
          <Button
            {...btnProps}
            onClick={handleNext}
            disabled={isCurrentPeriod()}>
            Next
            <Icon icon="bi:arrow-right" />
          </Button>
        </div>
        <ResponsiveChartContainer
          title={title}
          dataset={completeData}
          series={[
            { type: "bar", dataKey: "value" },
            { type: "line", data: [target, target, target, target] },
          ]}
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
              max: Math.max(target, ...completeData.map((d) => d.value)),
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
          <ChartsReferenceLine
            y={target}
            lineStyle={{ strokeDasharray: "10 5" }}
            labelStyle={{ fontSize: "10" }}
            label={`target`}
            labelAlign="end"
          />
          <ChartsXAxis axisId="date" position="bottom" />
          <ChartsYAxis axisId="value" position="left" />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
}

export default HabitTrackerStatsSingle;
