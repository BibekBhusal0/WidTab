import {
  AllWidgetPropsMapping,
  allWidgetsType,
  WidgetMappingAll,
} from "@/types/slice/widgets";
import { Layout } from "react-grid-layout";
import { ControlsProps } from "@/layout/widgets/controls";
import HabitTrackerControls from "@/layout/widgets/habit-tracker/controls";
import ClockControls from "@/layout/widgets/clock/controls";
import TodoControls from "@/layout/widgets/todo/todo-controls";
import CustomWidget, { URLChange } from "@/layout/widgets/custom";
import TimerControls from "@/layout/widgets/timer/controls";
import BookmarkControls from "@/layout/widgets/bookmark/controls";
import SitesControls from "@/layout/widgets/favorites/controls";
import { FunctionComponent } from "react";
import TodoWidget from "@/layout/widgets/todo/widget";
import BookmarkWidget from "@/layout/widgets/bookmark";
import ClockWidget from "@/layout/widgets/clock";
import HabitTrackerWidget, {
  HabitTrackerStatsSingleWidget,
} from "@/layout/widgets/habit-tracker/widget";
import SearchWidget from "@/layout/widgets/search";
import Calendar from "@/layout/widgets/calendar";
import HabitTrackerStatsAll from "@/layout/widgets/habit-tracker/stats/all";
import TimerWidget from "@/layout/widgets/timer";
import NoteWidget from "@/layout/widgets/note/widget";
import TimerStats from "@/layout/widgets/timer/stats";
import Navigation from "@/layout/widgets/navigation/widget";
import { CylindricalNavigation } from "@/layout/widgets/navigation/cylindrical";
import Favorites from "@/layout/widgets/favorites";

export const widgetDimensions: Record<allWidgetsType, Partial<Layout>> = {
  "habit-tracker": { minW: 4, minH: 2, maxH: 2, maxW: 8 },
  "habit-tracker-stats-single": { minW: 4, minH: 3 },
  "habit-tracker-stats-all": { minW: 4, minH: 3 },
  "timer-stats": { minW: 4, minH: 3 },
  todo: { minW: 3, minH: 4 },
  note: { minW: 3, minH: 4 },
  bookmark: { minW: 2, minH: 2 },
  favorites: { minW: 2, minH: 2 },
  clock: { maxH: 5, maxW: 8, minH: 1, minW: 2 },
  search: { maxH: 1, minW: 4 },
  custom: { minW: 1, minH: 1 },
  calendar: { minH: 4, minW: 3, isResizable: false },
  "cylindrical-navigation": { minH: 2, minW: 4, maxH: 3, maxW: 5 },
  navigation: { minH: 3, minW: 2, maxW: 5 },
  timer: { minW: 3, minH: 3, maxW: 6 },
};

export const getWidgetControlsProps = (
  widgetType: allWidgetsType,
  id: number
): ControlsProps => {
  const widgetInfo = { id: id, type: widgetType };
  const controlsProps: Partial<Record<allWidgetsType, ControlsProps>> = {
    custom: {
      deleteButton: true,
      controls: <URLChange id={id} />,
      widgetInfo,
      showContextMenu: false,
      includePopover: false,
    },
    "habit-tracker": {
      deleteButton: false,
      showOn: "hover",
      controls: <HabitTrackerControls id={id} />,
      className: "flex-center flex-col gap-4 p-2 ",
      widgetInfo,
    },
    clock: {
      deleteButton: false,
      showOn: "hover",
      controls: <ClockControls id={id} />,
      widgetInfo,
    },
    todo: {
      deleteButton: false,
      showOn: "hover",
      controls: <TodoControls id={id} />,
      widgetInfo,
    },
    timer: {
      deleteButton: false,
      showOn: "hover",
      widgetInfo,
      controls: <TimerControls id={id} />,
    },
    bookmark: {
      deleteButton: false,
      controls: <BookmarkControls id={id} />,
      widgetInfo,
    },
    favorites: {
      widgetInfo,
      controls: <SitesControls id={id} type="favorites" />,
      showOn: "hover",
      deleteButton: false,
    },
  };

  return controlsProps[widgetType] || { widgetInfo };
};

export const widgetElementMapping: {
  [K in WidgetMappingAll["type"]]: FunctionComponent<AllWidgetPropsMapping<K>>;
} = {
  custom: CustomWidget,
  todo: TodoWidget,
  bookmark: BookmarkWidget,
  clock: ClockWidget,
  "habit-tracker": HabitTrackerWidget,
  search: SearchWidget,
  calendar: Calendar,
  "habit-tracker-stats-single": HabitTrackerStatsSingleWidget,
  "habit-tracker-stats-all": HabitTrackerStatsAll,
  "cylindrical-navigation": CylindricalNavigation,
  navigation: Navigation,
  timer: TimerWidget,
  "timer-stats": TimerStats,
  favorites: Favorites,
  note: NoteWidget,
};
