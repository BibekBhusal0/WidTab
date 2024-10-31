import { Layout } from "react-grid-layout";
import { TaskType } from "./todo";
import { HabitTrackerHistoryType, HabitTrackerItemType } from "./habit-tracker";
import { BookmarkWidgetType } from "./bookmark";

const SP = ["todo", "bookmark", "habit-tracker"] as const;
const CW = [
  ...SP,
  "habit-tracker-stats-single",
  "habit-tracker-stats-all",
] as const;
const UW = [
  "custom",
  "clock",
  "search",
  "calendar",
  "navigation",
  "timer",
  "timer-stats",
  "bookmark",
] as const;
const SE = ["Google", "Bing", "YouTube", "Brave", "DuckDuckGo"] as const;

export type StaticPagesType = (typeof SP)[number];
export type controlledWidgetsType = (typeof CW)[number];
export type uncontrolledWidgetsType = (typeof UW)[number];
export type AllSearchEngines = (typeof SE)[number];
export type allWidgetsType = controlledWidgetsType | uncontrolledWidgetsType;

export const staticPages: StaticPagesType[] = [...SP];
export const allWidgets: allWidgetsType[] = [...CW, ...UW];
export const controlledWidgets: controlledWidgetsType[] = [...CW];
export const uncontrolledWidgets: uncontrolledWidgetsType[] = [...UW];
export const searchEngines: AllSearchEngines[] = [...SE];
export type CustomWidgetType = { id: number; url: string };

export type ClockWidgetType = {
  id: number;
  TwentyFourHour?: boolean;
  clockType?: "analog" | "digital";
  timeZone?: string;
  showSeconds?: boolean;
  showTimeZone?: boolean;
};
export type TimerWidgetType = {
  id: number;
  music?: boolean;
  time: number;
  history?: HabitTrackerHistoryType[];
};
export type SearchWidgetType = { id: number; engine: AllSearchEngines };
export type controlledWidgetValues = { id: number };
export type DeleteWidgetParameters = { type: allWidgetsType; id: number };

export type WidgetMappingControlled = {
  type: controlledWidgetsType;
  values: controlledWidgetValues;
};
export type WidgetMappingUncontrolled =
  | { type: "custom"; values: CustomWidgetType }
  | { type: "clock"; values: ClockWidgetType }
  | { type: "search"; values: SearchWidgetType }
  | {
      type: "calendar" | "navigation" | "timer-stats";
      values: controlledWidgetValues;
    }
  | { type: "bookmark"; values: BookmarkWidgetType }
  | { type: "timer"; values: TimerWidgetType };

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

export type WidgetType = { gridProps: Layout } & WidgetMappingAll;
