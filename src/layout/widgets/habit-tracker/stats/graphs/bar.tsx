import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import dayjs from "@/dayjsConfig";
import { useTheme } from "@mui/material/styles";

export type BarGraphProps = {
  data: { date: string; value: number }[];
  size: { width: number; height: number };
  showTarget?: boolean;
  unit: string;
  title: string;
  target?: number;
};

function BarGraph({
  unit,
  target,
  data,
  size,
  showTarget = true,
}: BarGraphProps) {
  const {
    palette: { error, success, text },
  } = useTheme();

  const weekly = data.length === 7;
  const formattedData = data.map((d) => ({
    ...d,
    formattedDate: weekly
      ? dayjs(d.date).format("ddd")
      : `${dayjs(d.date).format("MMM")}\n${dayjs(d.date).format("DD")}`,
  }));

  return (
    <div style={{ height: size.height - 40, width: size.width }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <XAxis
            dataKey="formattedDate"
            interval={0}
            angle={-45}
            textAnchor="end"
            tick={{ fill: text.primary, fontSize: 10 }}
            tickCount={10}
            axisLine={{ stroke: text.primary }}></XAxis>
          <YAxis
            label={{
              value: unit,
              angle: -90,
              position: "insideLeft",
              fill: text.primary,
            }}
            tick={{ fill: text.primary }}
            axisLine={{ stroke: text.primary }}
            domain={[
              0,
              Math.max(target || 0, ...data.map((d) => d.value)),
            ]}></YAxis>

          <Bar dataKey="value" radius={[10, 10, 0, 0]} fill={success.main}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.value >= (target || 0) ? success.main : error.main}
              />
            ))}
          </Bar>

          {showTarget && target && (
            <ReferenceLine
              y={target}
              label="Target"
              stroke={error.main}
              strokeDasharray="5 5"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;
