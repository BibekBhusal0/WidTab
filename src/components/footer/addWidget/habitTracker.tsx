import Button from "@mui/material/Button";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { widgetDimensions } from "@/utils/getWidget";
import { getNextId } from "@/utils/next_id";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import { addItem } from "@/redux/slice/habit-tracker";
import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import HabitTrackerEdit from "@/layout/widgets/habit-tracker/edit";
import { useState } from "react";
import { Icon } from "@iconify/react";
import AllItemsList from "./allItemsList";
import SettingHeader from "../settings/settings-header";

function AddHabitTracer() {
  const dispatch = useDispatch();
  const { trackers, pinned } = useSelector(
    (state: StateType) => state["habit-tracker"]
  );
  const dimensions = widgetDimensions["habit-tracker"];
  const { minH, minW } = dimensions;
  const statsDimensions = widgetDimensions["habit-tracker-stats-single"];
  const availablePositionForStats = useAvailablePosition(
    statsDimensions.minW,
    statsDimensions.minH
  );
  const availablePosition = useAvailablePosition(minW, minH);
  const layout = useCurrentLayout();

  if (!layout) return null;
  const { widgets } = layout;
  const presentTrackersId = widgets
    .filter(({ type }) => type === "habit-tracker")
    .map(({ values: { id } }) => id);
  const presentStatsId = widgets
    .filter(({ type }) => type === "habit-tracker-stats-single")
    .map(({ values: { id } }) => id);

  const addStatsWidget = (id: number) => {
    if (!availablePositionForStats || presentStatsId.includes(id)) return;
    dispatch(
      currentSpaceAddWidget({
        type: "habit-tracker-stats-single",
        values: {
          id,
        },
        gridProps: {
          ...statsDimensions,
          ...availablePositionForStats,
          i: `habit-tracker-stats-single-${id}`,
        },
      })
    );
  };
  const addTrackerWidget = (id: number) => {
    if (!availablePosition || presentTrackersId.includes(id)) return;
    dispatch(
      currentSpaceAddWidget({
        type: "habit-tracker",
        values: {
          id,
        },
        gridProps: {
          ...dimensions,
          ...availablePosition,
          i: `habit-tracker-${id}`,
        },
      })
    );
  };

  const handleNewHabitTracker = (tracker: HabitTrackerItemType) => {
    if (!availablePosition) return;
    const newId = getNextId(trackers.map(({ id }) => id));
    dispatch(addItem(tracker));
    addTrackerWidget(newId);
  };

  return (
    <div className="text-xl size-full relative">
      <div>
        <SettingHeader first>Habit Tracker</SettingHeader>
        <AllItemsList
          addWidget={addTrackerWidget}
          items={trackers}
          availablePosition={!!availablePosition}
          disabledId={presentTrackersId}
          pinned={pinned}
        />
        <SettingHeader>Habit Tracker Stats </SettingHeader>
        <AllItemsList
          addWidget={addStatsWidget}
          items={trackers}
          availablePosition={!!availablePositionForStats}
          disabledId={presentStatsId}
          pinned={pinned}
        />

        <AddNewHabitTracker
          addHabitTracker={handleNewHabitTracker}
          disabled={!availablePosition}
        />
      </div>
      {/* <div className="absolute pb-4 bottom-0"></div> */}
      {!availablePosition && (
        <div className="text-lg text-error-main pt-3">
          Not Enough Space For Habit Tacker
        </div>
      )}
    </div>
  );
}

function AddNewHabitTracker({
  addHabitTracker,
  disabled = false,
}: {
  addHabitTracker: (tracker: HabitTrackerItemType) => void;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex-center flex-col gap-4 w-full mt-5">
      {show && (
        <HabitTrackerEdit
          onChange={(tracker) => {
            addHabitTracker(tracker);
            setShow(false);
          }}
          buttonProps={{ children: "Add", disabled }}
        />
      )}
      <Button
        onClick={() => setShow(!show)}
        variant="outlined"
        color={show ? "error" : "primary"}
        startIcon={
          <Icon icon={`material-symbols:${show ? "arrow-back" : "add"}`} />
        }
        children={show ? "Back" : "Add New Habit Tracker"}
        disabled={disabled}
      />
    </div>
  );
}

export default AddHabitTracer;
