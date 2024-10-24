import dayjs from "@/dayjsConfig";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import { generateCompleteData } from "@/utils/getCompleteData";
import alphaColor from "@/utils/alpha";

export type commitGraphProps = {
  trackers: HabitTrackerItemType[];
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

function CommitGraph({ trackers, startDate, endDate }: commitGraphProps) {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();
  const weekly = endDate.diff(startDate, "day") < 7;
  const dates = Array.from({
    length: endDate.diff(dayjs(startDate), "day") + 1,
  }).map((_, i) => startDate.add(i, "day"));
  return (
    <table className="commit-graph w-full" style={{ tableLayout: "fixed" }}>
      <thead>
        <tr>
          <th style={{ width: "100px" }}></th>
          {dates.map((date) => (
            <th
              style={{ width: `${100 / dates.length}%` }}
              key={date.format("YYYY-MM-DD")}>
              {date.format(weekly ? "ddd" : "MMM DD")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {trackers.map((tracker) => {
          const completeData = generateCompleteData(
            tracker.history,
            startDate,
            endDate
          );
          return (
            <tr key={tracker.id}>
              <th className="truncate">{tracker.title}</th>
              {completeData.map((data) => {
                const progress = data.value / tracker.target;
                return (
                  <td key={data.date}>
                    <div
                      className="h-full aspect-square p-1 rounded-md"
                      style={{
                        backgroundColor: alphaColor(
                          main,
                          Math.max(0.05, progress)
                        ),
                      }}>
                      {progress >= 1 && (
                        <Icon
                          icon="pajamas:check-sm"
                          className="size-full text-primary-contrastText"
                        />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CommitGraph;
