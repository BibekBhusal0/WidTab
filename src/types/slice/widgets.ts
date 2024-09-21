import { BookmarkWidgetType } from "./bookmark";
import { HabitTrackerItemType } from "./habit-tracker";
import { TaskType } from "./todo";
import { Layout } from "react-grid-layout";

export const AW = [
  "todo",
  "bookmark",
  "custom",
  "clock",
  "search",
  "habit-tracker",
] as const;
export const CW = ["todo", "bookmark", "habit-tracker"] as const;
export const UW = ["custom", "clock", "search"] as const;

export type allWidgetsType = (typeof AW)[number];
export type controlledWidgetsType = (typeof CW)[number];
export type uncontrolledWidgetsType = (typeof UW)[number];

export const allWidgets: allWidgetsType[] = [...AW];
export const customWidgets: controlledWidgetsType[] = [...CW];
export const uncontrolledWidgets: uncontrolledWidgetsType[] = [...UW];

export type CustomWidgetType = {
  id: string;
  url: string;
};

export type ClockWidgetType = {
  id: string;
  TwentyFourHour: boolean;
  ShowDay: boolean;
  ShowSeconds: boolean;
  // TimeZone: string,
  // clockType : 'analog' | 'digital'
};

export type AllSearchEngines =
  | "google"
  | "bing"
  | "youtube"
  | "duckduckgo"
  | "brace";

export type SearchWidgetType = {
  id: string;
  engine: AllSearchEngines;
};

export type WidgetMapping =
  | { type: "todo"; values: TaskType }
  | { type: "habit-tracker"; values: HabitTrackerItemType }
  | { type: "bookmark"; values: BookmarkWidgetType }
  | { type: "custom"; values: CustomWidgetType }
  | { type: "clock"; values: ClockWidgetType }
  | { type: "search"; values: SearchWidgetType };

export type WidgetType = {
  gridProps: Layout;
} & WidgetMapping;
