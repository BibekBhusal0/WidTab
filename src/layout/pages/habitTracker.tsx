import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import HabitTracker from "../widgets/habit-tracker";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";

function HabitTrackerPage() {
  const { pinned, trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const pinnedTracker = trackers.filter((t) => t.id === pinned);
  const unPinnedTrackers = trackers.filter((t) => t.id !== pinned);

  const renderTrackers = (trackerList: HabitTrackerItemType[]) =>
    trackerList.map((tracker) => (
      <Paper
        key={tracker.id}
        sx={{
          backgroundColor:
            tracker.id === pinned ? "primaryContainer.paper" : undefined,
        }}
        className="h-[150px] overflow-hidden">
        <HabitTracker {...tracker} />
      </Paper>
    ));

  return (
    <div className="grid gap-3 grid-cols-1 p-3 overflow-auto sm:grid-cols-2 md:grid-cols-3">
      {renderTrackers(pinnedTracker)}
      {renderTrackers(unPinnedTrackers)}
    </div>
  );
}

export default HabitTrackerPage;
