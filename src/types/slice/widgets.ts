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
  | "brave";

export type SearchWidgetType = {
  id: string;
  engine: AllSearchEngines;
};

export type WidgetMappingDynamic =
  | { type: controlledWidgetsType; values: { id: string } }
  | { type: "custom"; values: CustomWidgetType }
  | { type: "clock"; values: ClockWidgetType }
  | { type: "search"; values: SearchWidgetType };

export type WidgetTypeMapping =
  | { type: "todo"; values: TaskType }
  | { type: "habit-tracker"; values: HabitTrackerItemType }
  | { type: "bookmark"; values: BookmarkWidgetType }
  | { type: "custom"; values: CustomWidgetType }
  | { type: "clock"; values: ClockWidgetType }
  | { type: "search"; values: SearchWidgetType };

export type WidgetType = {
  gridProps: Layout;
} & WidgetMappingDynamic;

// function createEmptyWidget(
//   type: allWidgetsType,
//   id?: string,
//   engine?: AllSearchEngines
// ): WidgetMappingDynamic {
//   switch (type) {
//     case "clock":
//       return {
//         type: "clock",
//         values: {
//           id: "",
//           TwentyFourHour: false,
//           ShowDay: false,
//           ShowSeconds: false,
//         },
//       };

//     case "custom":
//       return {
//         type: "custom",
//         values: {
//           id: id || "",
//           url: "",
//         },
//       };

//     case "search":
//       return {
//         type: "search",
//         values: {
//           id: id || "",
//           engine: engine || "google",
//         },
//       };

//     default:
//       return {
//         type,
//         values: {
//           id: id || "",
//         },
//       };
//   }
// }

// createEmptyWidget('clock')
