import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// import { Icon } from "@iconify/react";
// import { cn } from "@/utils/cn";
import HabitTracker from "../widgets/habit-tracker";

function HabitTrackerPage() {
  const {
    palette: {
      primaryContainer: { paper },
    },
  } = useTheme();
  const { pinned, trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const pinned_ = trackers.filter((t) => t.id === pinned);
  const unPinned = trackers.filter((t) => t.id !== pinned);

  //   const dispatch = useDispatch();
  const commonCls = "h-[150px] overflow-hidden";
  return (
    <div className="grid gap-3 grid-cols-1 p-3 overflow-auto sm:grid-cols-2 md:grid-cols-3">
      {pinned_.map((tracker) => (
        <Paper
          sx={{ background: paper }}
          key={tracker.id}
          className={commonCls}>
          <HabitTracker {...tracker} />
        </Paper>
      ))}
      {unPinned.map((tracker) => (
        <Paper key={tracker.id} className={commonCls}>
          <HabitTracker {...tracker} />
        </Paper>
      ))}
      {/* <Paper
        // onClick={() => dispatch(addtracker(""))}
        className={cn(commonCls , "flex-center group cursor-pointer")}
        >
        <div className="group-hover:scale-[6] scale-[3] transition-all">
          <Icon icon="material-symbols:add-circle-outline-rounded" />
        </div>
      </Paper> */}
    </div>
  );
}

export default HabitTrackerPage;
