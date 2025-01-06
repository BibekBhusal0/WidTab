import { useHabitTracker } from "@/storage";
import HabitTrackerStatsSingle from "../habit-tracker/stats/single";

function TimerStats() {
  const { timerHistory } = useHabitTracker();
  return (
    <HabitTrackerStatsSingle
      unit="min"
      target={0}
      title="Timer"
      history={timerHistory}
    />
  );
}

export default TimerStats;
