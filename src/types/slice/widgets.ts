import { Layout } from "react-grid-layout";
import { TaskType } from "./todo";
import { HabitTrackerItemType } from "./habit-tracker";
import { BookmarkWidgetType } from "./bookmark";

const CW = ["todo", "bookmark", "habit-tracker"] as const;
const UW = ["custom", "clock", "search"] as const;

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
  TwentyFourHour: boolean;
  ShowDay: boolean;
  ShowSeconds: boolean;
  // TimeZone: string,
  // clockType : 'analog' | 'digital'
};

export type SearchWidgetType = {
  id: number;
  engine: AllSearchEngines;
};

export type controlledWidgetValues = {
  id: number;
  deleteAction?: (id: number) => void;
};

export type WidgetMappingStatic = {
  type: controlledWidgetsType;
  values: controlledWidgetValues;
};
export type WidgetMappingDynamic =
  | { type: "custom"; values: CustomWidgetType }
  | { type: "clock"; values: ClockWidgetType }
  | { type: "search"; values: SearchWidgetType };

export type WidgetMappingAll = WidgetMappingStatic | WidgetMappingDynamic;

export type AllWidgetPropsMapping<T extends allWidgetsType> = Extract<
  WidgetMappingAll,
  { type: T }
>["values"];

export type WidgetTypeMapping =
  | { type: "todo"; values: TaskType }
  | { type: "habit-tracker"; values: HabitTrackerItemType }
  | { type: "bookmark"; values: BookmarkWidgetType }
  | { type: "custom"; values: CustomWidgetType }
  | { type: "clock"; values: ClockWidgetType }
  | { type: "search"; values: SearchWidgetType };

export type WidgetType = {
  gridProps: Layout;
} & WidgetMappingAll;
