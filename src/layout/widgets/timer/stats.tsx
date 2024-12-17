import { useSelector } from "react-redux";
import HabitTrackerStatsSingle from "../habit-tracker/stats/single";
import { StateType } from "@/redux/store";

function TimerStats() {
  const { timerHistory } = useSelector(
    (state: StateType) => state.habitTracker
  );
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
