import { Layout } from "react-grid-layout";
import { TaskType } from "./todo";
import { HabitTrackerHistoryType, HabitTrackerItemType } from "./habit-tracker";
import { BookmarkWidgetType, FavoritesWidgetType } from "./bookmark";
import { Content } from "@google/generative-ai";

const SP = ["todo", "bookmark", "habit-tracker", "note"] as const;
const CW = [
  "todo",
  "habit-tracker",
  "habit-tracker-stats-single",
  "habit-tracker-stats-all",
  "note",
] as const;
const UW = [
  "custom",
  "clock",
  "search",
  "calendar",
  "navigation",
  "cylindrical-navigation",
  "timer",
  "timer-stats",
  "bookmark",
  "favorites",
  "top-sites",
  "gemini",
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

const am = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.5-pro",
  "gemini-1.0-pro",
] as const;
export type aiModel = (typeof am)[number];
export const AImodels: aiModel[] = [...am];

export type geminiWidgetType = {
  id: number;
  model: aiModel;
  conversation: Content[];
};

export type ClockWidgetType = {
  id: number;
  TwentyFourHour?: boolean;
  clockType?: "analog" | "digital";
  timeZone?: string;
  showSeconds?: boolean;
  showTimeZone?: boolean;
};
export type TimerWidgetType = {
  time: number;
  id: number;
  music?: boolean;
  running?: boolean;
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
      type:
        | "calendar"
        | "navigation"
        | "timer-stats"
        | "cylindrical-navigation";
      values: controlledWidgetValues;
    }
  | { type: "bookmark"; values: BookmarkWidgetType }
  | { type: "favorites"; values: FavoritesWidgetType }
  | { type: "top-sites"; values: FavoritesWidgetType }
  | { type: "gemini"; values: geminiWidgetType }
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
