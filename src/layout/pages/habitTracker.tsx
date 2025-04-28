import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import HabitTracker from "../widgets/habit-tracker";
import HabitTrackerStatsAll from "../widgets/habit-tracker/stats/all";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@mui/material/Button";
import HabitTrackerEdit from "../widgets/habit-tracker/edit";
import { Icon } from "@iconify/react";
import { addItem, reorderTrackers } from "@/redux/slice/habit-tracker";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import Controls from "../widgets/controls";
import { getWidgetControlsProps } from "@/utils/getWidget";
import { ScrollArea } from "@/components/scrollarea";
import { Sortable, SortableItem, SortableDragHandle } from "@/components/sortable";

function HabitTrackerPage() {
  const { pinned, trackers } = useSelector((state: StateType) => state.habitTracker);
  const dispatch = useDispatch();
  const [showStats, setShowStats] = useState(false);

  return (
    <ScrollArea className="size-full">
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ y: "-100%", height: 0 }}
            exit={{ y: "-100%", height: 0 }}
            animate={{ y: 0, height: "auto" }}
            transition={{ duration: 0.007, ease: "easeInOut" }}
            className="w-full overflow-hidden border-b-2 pb-4">
            <HabitTrackerStatsAll />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="m-5 flex items-center justify-end">
        <Button
          onClick={() => setShowStats(!showStats)}
          variant="outlined"
          color="secondary"
          className="px-4 py-2">
          {showStats ? "Hide" : "Show"} Stats
        </Button>
      </div>
      <Sortable
        value={trackers}
        orientation="mixed"
        constraint={{ distance: 20, delay: 400 }}
        onValueChange={(t) => dispatch(reorderTrackers(t))}>
        <div className="m-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {trackers.map((tracker) => (
            <SortableItem key={tracker.id} value={tracker.id} className="relative">
              <Paper
                sx={{
                  backgroundColor:
                    tracker.id === pinned ? "primaryContainer.paper" : "secondaryContainer.paper",
                }}
                className="relative h-[150px] overflow-hidden">
                <Controls {...getWidgetControlsProps("habit-tracker", tracker.id)} showOn="always">
                  <div className="z-0 size-full">
                    <SortableDragHandle className="rounded-themed absolute top-0 left-0 size-full cursor-auto data-[state=dragging]:cursor-grabbing" />
                    <HabitTracker {...tracker} />
                  </div>
                </Controls>
              </Paper>
            </SortableItem>
          ))}
          <AddNewHabitTracker />
        </div>
      </Sortable>
    </ScrollArea>
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
      sx={{ backgroundColor: "secondaryContainer.paper" }}
      className={cn("flex-center group w-full flex-col gap-4", {
        "h-[150px]": !edit,
        "px-10 py-2": edit,
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
        <div className="scale-300 transition-all group-hover:scale-600">{add}</div>
      )}
    </Paper>
  );
}

export default HabitTrackerPage;
