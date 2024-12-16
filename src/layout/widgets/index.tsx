import {
  allWidgetsType,
  AllWidgetPropsMapping,
  WidgetType,
  WidgetMappingAll,
} from "@/types/slice/widgets";
import CustomWidget from "./custom";
import TodoWidget from "./todo/widget";
import BookmarkWidget from "./bookmark";
import ClockWidget from "./clock";
import HabitTrackerWidget, {
  HabitTrackerStatsSingleWidget,
} from "./habit-tracker/widget";
import SearchWidget from "./search";
import { FunctionComponent } from "react";
import Calendar from "./calendar";
import HabitTrackerStatsAll from "./habit-tracker/stats/all";
import { CylindricalNavigation } from "./navigation";
import Controls from "./controls";
import { getWidgetControlsProps } from "@/utils/getWidget";
import TimerWidget from "./timer";
import Favorites from "./favorites";
import TopSites from "./top-sites";
import NoteWidget from "./note/widget";
import GeminiWidget from "./gemini";
import TimerStats from "./timer/stats";

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
  navigation: CylindricalNavigation,
  timer: TimerWidget,
  "timer-stats": TimerStats,
  gemini: GeminiWidget,
  favorites: Favorites,
  "top-sites": TopSites,
  note: NoteWidget,
};

function Widget({ widget }: { widget: WidgetType }) {
  const Element = widgetElementMapping[widget.type] as FunctionComponent<
    AllWidgetPropsMapping<allWidgetsType>
  >;
  return (
    <>
      <Controls {...getWidgetControlsProps(widget.type, widget.values.id)}>
        <Element {...widget.values} />
      </Controls>
    </>
  );
}

export default Widget;
