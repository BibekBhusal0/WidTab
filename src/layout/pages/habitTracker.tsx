import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import HabitTracker from "../widgets/habit-tracker";

const commonCls = "h-[150px] overflow-hidden";
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
      {/* <AddHabitTracker /> */}
    </div>
  );
}

// const AddHabitTracker = () => {
//   const [editing, setEditing] = useState(false);
//   return (
//     <Paper
//       onClick={() => setEditing(true)}
//       className={cn(
//         commonCls,
//         "flex-center group cursor-pointer overflow-auto"
//       )}
//       //
//     >
//       {editing ? (
//         <div className="p-4">
//           <HabitTrackerEdit onChange={() => setEditing(false)} />
//         </div>
//       ) : (
//         <div className="group-hover:scale-[6] scale-[3] transition-all">
//           <Icon icon="material-symbols:add-circle-outline-rounded" />
//         </div>
//       )}
//     </Paper>
//   );
// };

export default HabitTrackerPage;
