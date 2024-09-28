import {
  allWidgetsType,
  //   controlledWidgets,
  //   controlledWidgetsType,
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
// import { useDispatch } from "react-redux";
// import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

export const done: allWidgetsType[] = ["custom", "todo"];

export const widgetElementMapping: {
  [K in WidgetMappingAll["type"]]: FunctionComponent<AllWidgetPropsMapping<K>>;
} = {
  custom: CustomWidget,
  todo: TodoWidget,
  bookmark: BookmarkWidget,
  clock: ClockWidget,
  "habit-tracker": HabitTrackerWidget,
  search: SearchWidget,
};

function Widget({ widget }: { widget: WidgetType }) {
  //   const dispatch = useDispatch();
  if (!done.includes(widget.type)) return null;
  const Element = widgetElementMapping[widget.type] as FunctionComponent<
    AllWidgetPropsMapping<allWidgetsType>
  >;
  //   if (controlledWidgets.includes(widget.type as controlledWidgetsType)) {
  //     return (
  //       <Element
  //         {...widget.values}
  //         deleteAction={(id) => {
  //           dispatch(currentSpaceDeleteWidget({ type: widget.type, id }));
  //         }}
  //       />
  //     );
  //   }

  return <Element {...widget.values} />;
}

export default Widget;
