import { Layout } from "react-grid-layout";
import { TaskType } from "./todo";
import { HabitTrackerItemType } from "./habit-tracker";
import { BookmarkWidgetType } from "./bookmark";

const CW = ["todo", "bookmark", "habit-tracker"] as const;
const UW = ["custom", "clock", "search", "calendar"] as const;

export type controlledWidgetsType = (typeof CW)[number];
export type uncontrolledWidgetsType = (typeof UW)[number];
export type allWidgetsType = controlledWidgetsType | uncontrolledWidgetsType;

export const allWidgets: allWidgetsType[] = [...CW, ...UW];
export const controlledWidgets: controlledWidgetsType[] = [...CW];
export const uncontrolledWidgets: uncontrolledWidgetsType[] = [...UW];

export type AllSearchEngines =
  | "google"
  | "bing"
  | "youtube"
  | "duckduckgo"
  | "brave";

export type CustomWidgetType = {
  id: number;
  url: string;
};

export type ClockWidgetType = {
  id: number;
  TwentyFourHour?: boolean;
  clockType?: "analog" | "digital";
  timeZone?: string;
  showSeconds?: boolean;
  //   ShowDay: boolean;
};

export type SearchWidgetType = {
  id: number;
  engine: AllSearchEngines;
};

export type controlledWidgetValues = {
  id: number;
};

export type DeleteWidgetParameters = {
  type: allWidgetsType;
  id: number;
};

export type WidgetMappingControlled = {
  type: controlledWidgetsType;
  values: controlledWidgetValues;
};
export type WidgetMappingUncontrolled =
  | { type: "custom"; values: CustomWidgetType }
  | { type: "clock"; values: ClockWidgetType }
  | { type: "search"; values: SearchWidgetType }
  | { type: "calendar"; values: controlledWidgetValues };

export type WidgetMappingAll =
  | WidgetMappingControlled
  | WidgetMappingUncontrolled;

export type AllWidgetPropsMapping<T extends allWidgetsType> = Extract<
  WidgetMappingAll,
  { type: T }
>["values"];

export type WidgetTypeMapping =
  | WidgetMappingUncontrolled
  | { type: "todo"; values: TaskType }
  | { type: "habit-tracker"; values: HabitTrackerItemType }
  | { type: "bookmark"; values: BookmarkWidgetType };

export type WidgetType = {
  gridProps: Layout;
} & WidgetMappingAll;
