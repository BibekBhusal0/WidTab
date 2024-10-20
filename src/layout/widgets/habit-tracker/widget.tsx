import { StateType } from "@/redux/store";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { useSelector } from "react-redux";
import HabitTracker from ".";

function HabitTrackerWidget({ id }: controlledWidgetValues) {
  const habitTracker = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const currentHabitTracker = habitTracker.trackers.find(
    (tracker) => tracker.id === id
  );
  if (!currentHabitTracker) return null;

  return <HabitTracker {...currentHabitTracker} />;
}

export default HabitTrackerWidget;
