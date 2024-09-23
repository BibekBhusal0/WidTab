import { controlledWidgetsType, WidgetType } from "./widgets";

export type CurrentSpaceType =
  | {
      type: "dynamic";
      id: string;
    }
  | { type: "static"; id: controlledWidgetsType };

export type DynamicSpaceType = {
  id: string;
  compaction: "none" | "vertical" | "horizontal";
  locked: boolean;
  delete_able?: boolean;
  widgets: WidgetType[];
};

export type LayoutSliceType = {
  n_rows: number;
  n_cols: number;

  currentSpace: CurrentSpaceType;
  allSpaces: DynamicSpaceType[];
};
