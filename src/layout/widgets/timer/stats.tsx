import { useSelector } from "react-redux";
import HabitTrackerStatsSingle from "../habit-tracker/stats/single";
import { StateType } from "@/redux/store";
import dayjs from "@/dayjsConfig";

function TimerStats() {
  const { timerHistory = {} } = useSelector((state: StateType) => state.habitTracker);
  const today = dayjs().format("YYYY-MM-DD");
  const todayTime = timerHistory?.[today] || 0;
  const totalTime = Object.values(timerHistory || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="size-full flex flex-col">
      <div className="full-between text-xl py-1 px-6 relative">
        <div>
          Today: {totalTime}
          <span className="text-xs"> Min</span>
        </div>
        <div>
          Total: {todayTime}
          <span className="text-xs"> Min</span>
        </div>
      </div>

      <HabitTrackerStatsSingle unit="min" target={0} title="Timer" history={timerHistory} />
    </div>
  );
}

export default TimerStats;
