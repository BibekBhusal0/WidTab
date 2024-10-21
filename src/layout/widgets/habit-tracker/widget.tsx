import { StateType } from "@/redux/store";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { useDispatch, useSelector } from "react-redux";
import HabitTracker from ".";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

function HabitTrackerWidget({ id }: controlledWidgetValues) {
  const habitTracker = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const currentHabitTracker = habitTracker.trackers.find(
    (tracker) => tracker.id === id
  );
  const dispatch = useDispatch();
  if (!currentHabitTracker) {
    dispatch(currentSpaceDeleteWidget({ id, type: "habit-tracker" }));
    return null;
  }

  return <HabitTracker {...currentHabitTracker} />;
}

export default HabitTrackerWidget;
