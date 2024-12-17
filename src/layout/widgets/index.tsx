import {
  allWidgetsType,
  AllWidgetPropsMapping,
  WidgetType,
} from "@/types/slice/widgets";
import { FunctionComponent } from "react";
import Controls from "./controls";
import {
  getWidgetControlsProps,
  widgetElementMapping,
} from "@/utils/getWidget";
import CustomWidget from "./custom";
import TodoWidget from "./todo/widget";
import BookmarkWidget from "./bookmark";
import ClockWidget from "./clock";
import HabitTrackerWidget, {
  HabitTrackerStatsSingleWidget,
} from "./habit-tracker/widget";
import SearchWidget from "./search";
import Calendar from "./calendar";
import HabitTrackerStatsAll from "./habit-tracker/stats/all";
import { CylindricalNavigation } from "./navigation/cylindrical";
import TimerWidget from "./timer";
import Favorites from "./favorites";
import TopSites from "./top-sites";
import NoteWidget from "./note/widget";
import GeminiWidget from "./gemini";
import TimerStats from "./timer/stats";
import Navigation from "./navigation/widget";

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
