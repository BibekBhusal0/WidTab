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
import HabitTrackerWidget from "./habit-tracker";
import SearchWidget from "./search";
import { FunctionComponent } from "react";
import Calendar from "./calendar";
import { Box } from "@mui/material";

export const done: allWidgetsType[] = ["custom", "todo", "clock", "calendar"];

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

  return (
    <Box className="size-full z-[20]">
      <Element {...widget.values} />
    </Box>
  );
}

export default Widget;
