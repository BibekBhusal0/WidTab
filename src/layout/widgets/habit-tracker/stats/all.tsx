import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";

function HabitTrackerStatsApp() {
  const { trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  console.log(trackers);
  return (
    <>
      <></>
    </>
  );
}

export default HabitTrackerStatsApp;
