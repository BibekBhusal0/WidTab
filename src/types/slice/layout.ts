import { controlledWidgetsType, WidgetType } from "./widgets";
import { BoxProps } from "@mui/material";

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

export type ControlBarPositions = "top" | "left" | "right" | "bottom";
export type LayoutSliceType = {
  controlBarPosition: ControlBarPositions;
  linkInNewTab: boolean;
  n_rows: number;
  n_cols: number;

  currentSpace: CurrentSpaceType;
  allSpaces: DynamicSpaceType[];
};

const height = 94;
const width = 97;
export type positionPropsType = Record<
  ControlBarPositions,
  Record<majorComponentsProps, BoxProps>
>;
type majorComponentsProps = "appProps" | "footerProps" | "mainComponentProps";

export const positionProps: positionPropsType = {
  top: {
    appProps: { className: "flex-col-reverse" },
    footerProps: {
      className: "flex-row",
      sx: { height: `${100 - height}%`, borderBottom: "1px solid" },
    },
    mainComponentProps: { sx: { height: `${height}%` } },
  },
  bottom: {
    appProps: { className: "flex-col" },
    footerProps: {
      className: "flex-row",
      sx: { height: `${100 - height}%`, borderTop: "1px solid" },
    },
    mainComponentProps: { sx: { height: `${height}%` } },
  },
  left: {
    appProps: { className: "flex-row-reverse" },
    footerProps: {
      className: "flex-col",
      sx: { width: `${100 - width}%`, borderRight: "1px solid" },
    },
    mainComponentProps: { sx: { width: `${width}%` } },
  },
  right: {
    appProps: { className: "flex-row" },
    footerProps: {
      className: "flex-col",
      sx: { width: `${100 - width}%`, borderLeft: "1px solid" },
    },
    mainComponentProps: { sx: { width: `${width}%` } },
  },
};
