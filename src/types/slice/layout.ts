import { controlledWidgetsType, WidgetType } from "./widgets";

export type CurrentSpaceType =
  | {
      type: "dynamic";
      id: number;
    }
  | { type: "static"; id: controlledWidgetsType };

export type compactionType = "none" | "vertical" | "horizontal";
export type DynamicSpaceType = {
  id: number;
  name: string;
  compaction: compactionType;
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
