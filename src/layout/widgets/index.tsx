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
import HabitTrackerWidget from "./habit-tracker/widget";
import SearchWidget from "./search";
import { FunctionComponent } from "react";
import Calendar from "./calendar";

export const done: allWidgetsType[] = [
  "custom",
  "todo",
  "clock",
  "calendar",
  "search",
  "habit-tracker",
];

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
};

function Widget({ widget }: { widget: WidgetType }) {
  if (!done.includes(widget.type)) return null;
  const Element = widgetElementMapping[widget.type] as FunctionComponent<
    AllWidgetPropsMapping<allWidgetsType>
  >;
  return <Element {...widget.values} />;
}

export default Widget;
