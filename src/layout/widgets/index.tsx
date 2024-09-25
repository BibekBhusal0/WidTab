import {
  allWidgetsType,
  WidgetMappingDynamic,
  WidgetPropsMappingDynamic,
  WidgetType,
} from "@/types/slice/widgets";
import CustomWidget from "./custom";
import TodoWidget from "./todo/widget";
import BookmarkWidget from "./bookmark";
import ClockWidget from "./clock";
import HabitTrackerWidget from "./habit-tracker";
import SearchWidget from "./search";
import { FunctionComponent } from "react";

export const done: allWidgetsType[] = ["custom", "todo"];

export const widgetElementMapping: {
  [K in WidgetMappingDynamic["type"]]: FunctionComponent<
    WidgetPropsMappingDynamic<K>
  >;
} = {
  custom: CustomWidget,
  todo: TodoWidget,
  bookmark: BookmarkWidget,
  clock: ClockWidget,
  "habit-tracker": HabitTrackerWidget,
  search: SearchWidget,
};

function Widget({ widget }: { widget: WidgetType }) {
  if (!done.includes(widget.type)) return null;
  const Element = widgetElementMapping[widget.type] as FunctionComponent<
    WidgetPropsMappingDynamic<typeof widget.type>
  >;

  return <Element {...widget.values} />;
}

export default Widget;
