import { allWidgetsType } from "@/types/slice/widgets";
import { Layout } from "react-grid-layout";
import { ControlsProps } from "@/layout/widgets/controls";
import HabitTrackerControls from "@/layout/widgets/habit-tracker/controls";
import ClockControls from "@/layout/widgets/clock/controls";
import TodoControls, { TodoMenu } from "@/layout/widgets/todo/todo-controls";
import { URLChange } from "@/layout/widgets/custom";
import TimerControls from "@/layout/widgets/timer/controls";
import BookmarkControls from "@/layout/widgets/bookmark/controls";
import SitesControls from "@/layout/widgets/favorites/controls";
import GeminiControls from "@/layout/widgets/gemini/controls";

export const widgetDimensions: Record<allWidgetsType, Partial<Layout>> = {
  "habit-tracker": { minW: 4, minH: 2, maxH: 2, maxW: 8 },
  "habit-tracker-stats-single": { minW: 4, minH: 3 },
  "habit-tracker-stats-all": { minW: 4, minH: 3 },
  "timer-stats": { minW: 4, minH: 3 },
  todo: { minW: 3, minH: 4 },
  note: { minW: 3, minH: 4 },
  bookmark: { minW: 2, minH: 2 },
  "top-sites": { minW: 2, minH: 2, maxH: 6, maxW: 6 },
  favorites: { minW: 2, minH: 2 },
  clock: { maxH: 5, maxW: 8, minH: 1, minW: 2 },
  search: { maxH: 1, minW: 4 },
  custom: { minW: 1, minH: 1 },
  calendar: { minH: 4, minW: 3, isResizable: false },
  navigation: { minH: 2, minW: 4, maxH: 3, maxW: 5 },
  timer: { minW: 4, minH: 3, maxW: 9 },
  gemini: { minW: 4, minH: 5 },
};

export const getWidgetControlsProps = (
  widgetType: allWidgetsType,
  id: number
): ControlsProps => {
  const widgetInfo = { id: id, type: widgetType };
  const controlsProps: Partial<Record<allWidgetsType, ControlsProps>> = {
    custom: { deleteButton: true, controls: <URLChange id={id} />, widgetInfo },
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
      includePopover: false,
      controlsContainerProps: {},
      widgetInfo,
      contextMenu: <TodoMenu id={id} />,
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
    "top-sites": {
      widgetInfo,
      controls: <SitesControls id={id} type="top-sites" />,
      showOn: "hover",
      deleteButton: false,
    },
    gemini: {
      widgetInfo,
      controls: <GeminiControls id={id} />,
      deleteButton: !1,
      showOn: "hover",
    },
  };

  return controlsProps[widgetType] || { widgetInfo };
};
