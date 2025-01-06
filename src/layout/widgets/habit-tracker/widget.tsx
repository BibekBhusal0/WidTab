import { controlledWidgetValues } from "@/types/slice/widgets";
import HabitTracker from ".";
import HabitTrackerStatsSingle from "./stats/single";
import { useHabitTracker } from "@/storage";
import { currentSpaceDeleteWidget } from "@/storage/layout";

type HabitTrackerOrStatsWidgetProps = controlledWidgetValues & {
  type: "tracker" | "stats";
};

export function HabitTrackerOrStatsWidget({
  id,
  type,
}: HabitTrackerOrStatsWidgetProps) {
  const habitTracker = useHabitTracker();
  const currentHabitTracker = habitTracker.trackers.find(
    (tracker) => tracker.id === id
  );
  if (!currentHabitTracker) {
    currentSpaceDeleteWidget({
      id,
      type: type === "tracker" ? "habit-tracker" : "habit-tracker-stats-single",
    });
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
