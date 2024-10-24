import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import HabitTracker from "../widgets/habit-tracker";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import HabitTrackerStatsAll from "../widgets/habit-tracker/stats/all";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";
import HabitTrackerEdit from "../widgets/habit-tracker/edit";
import { Icon } from "@iconify/react/dist/iconify.js";
import { addItem } from "@/redux/slice/habit-tracker";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function HabitTrackerPage() {
  const { pinned, trackers } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const [showStats, setShowStats] = useState(false);
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
    <>
      <AnimatePresence mode="sync">
        {showStats && (
          <motion.div
            layout
            initial={{ y: "-100%" }}
            exit={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full mb-4 border-b-2 border-divider">
            <HabitTrackerStatsAll />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-end m-5">
        <Button
          onClick={() => setShowStats(!showStats)}
          variant="outlined"
          color="secondary"
          className="px-4 py-2">
          {showStats ? "Hide" : "Show"} Stats
        </Button>
      </div>

      <div className="grid gap-3 grid-cols-1 m-3 overflow-auto sm:grid-cols-2 md:grid-cols-3">
        {renderTrackers(pinnedTracker)}
        {renderTrackers(unPinnedTrackers)}
        <AddNewHabitTracker />
      </div>
    </>
  );
}

function AddNewHabitTracker() {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { add } = useCurrentIcons();
  return (
    <Paper
      onClick={() => {
        if (!edit) setEdit(true);
      }}
      className={cn("flex-center flex-col gap-4 w-full group", {
        "h-[150px]": !edit,
        "py-2 px-10": edit,
      })}>
      {edit ? (
        <>
          <HabitTrackerEdit
            onChange={(tracker) => {
              dispatch(addItem(tracker));
              setEdit(false);
            }}
            buttonProps={{
              children: "Add",
              startIcon: <Icon icon="material-symbols:add" />,
            }}
          />
          <Button
            onClick={() => setEdit(false)}
            variant="outlined"
            color={"error"}
            startIcon={<Icon icon="material-symbols:arrow-back" />}
            children="Back"
          />
        </>
      ) : (
        <div className="group-hover:scale-[6] scale-[3] transition-all">
          {add}
        </div>
      )}
    </Paper>
  );
}

export default HabitTrackerPage;
