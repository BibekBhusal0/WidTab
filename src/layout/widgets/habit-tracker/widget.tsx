import { StateType } from "@/redux/store";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { useDispatch, useSelector } from "react-redux";
import HabitTracker from ".";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import HabitTrackerStatsSingle from "./stats/single";

type HabitTrackerOrStatsWidgetProps = controlledWidgetValues & {
  type: "tracker" | "stats";
};

export function HabitTrackerOrStatsWidget({
  id,
  type,
}: HabitTrackerOrStatsWidgetProps) {
  const habitTracker = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const currentHabitTracker = habitTracker.trackers.find(
    (tracker) => tracker.id === id
  );
  const dispatch = useDispatch();
  if (!currentHabitTracker) {
    dispatch(
      currentSpaceDeleteWidget({
        id,
        type:
          type === "tracker" ? "habit-tracker" : "habit-tracker-stats-single",
      })
    );
    return null;
  }
  if (type === "stats")
    return <HabitTrackerStatsSingle {...currentHabitTracker} />;
  return <HabitTracker {...currentHabitTracker} />;
}
export function HabitTrackerWidget({ id }: controlledWidgetValues) {
  return <HabitTrackerOrStatsWidget id={id} type="tracker" />;
}
export function HabitTrackerStatsSingleWidget({ id }: controlledWidgetValues) {
  return <HabitTrackerOrStatsWidget id={id} type="stats" />;
}

export default HabitTrackerWidget;
