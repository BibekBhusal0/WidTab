import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import HabitTracker from "../widgets/habit-tracker";
import HabitTrackerStatsAll from "../widgets/habit-tracker/stats/all";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@mui/material/Button";
import HabitTrackerEdit from "../widgets/habit-tracker/edit";
import { Icon } from "@iconify/react";
import { addItem, reorderTrackers } from "@/redux/slice/habit-tracker";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import Controls from "../widgets/controls";
import { getWidgetControlsProps } from "@/utils/getWidget";
import { ScrollArea } from "@/components/scrollarea";
import { Sortable, SortableItem } from "@/components/sortable";

function HabitTrackerPage() {
  const { pinned, trackers } = useSelector(
    (state: StateType) => state.habitTracker
  );
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
            className="w-full pb-4  border-b-2 border-divider overflow-hidden">
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
      <Sortable
        value={trackers}
        orientation="mixed"
        constraint={{ distance: 20, delay: 400 }}
        onValueChange={(t) => dispatch(reorderTrackers(t))}>
        <div className="grid gap-3 grid-cols-1 m-3 sm:grid-cols-2 md:grid-cols-3">
          {trackers.map((tracker) => (
            <SortableItem
              key={tracker.id}
              value={tracker.id}
              asTrigger
              className="cursor-auto data-[state=dragging]:cursor-grabbing"
              //
            >
              <Paper
                sx={{
                  backgroundColor:
                    tracker.id === pinned
                      ? "primaryContainer.paper"
                      : "secondaryContainer.paper",
                }}
                className="h-[150px] overflow-hidden relative">
                <Controls
                  {...getWidgetControlsProps("habit-tracker", tracker.id)}
                  showOn="always">
                  <div className="size-full z-0">
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
