import { which } from "@/hooks/useAllSpaceAndIcon";
import { StaticPagesType, WidgetType } from "./widgets";
import { BoxProps } from "@mui/material/Box";

export type CurrentSpaceType =
  | { type: "dynamic"; id: number }
  | { type: "static"; id: StaticPagesType };

export type DynamicSpaceType = {
  id: number;
  name: string;
  delete_able?: boolean;
  icon: string;
  widgets: WidgetType[];
};

export type ToolBarPositions = "top" | "left" | "right" | "bottom";
export const isToolbarHorizontal = (position: ToolBarPositions) =>
  position === "top" || position === "bottom";
export const oppositePosition: Record<ToolBarPositions, ToolBarPositions> = {
  top: "bottom",
  left: "right",
  right: "left",
  bottom: "top",
};

const RTBI = ["spaces", "lock", "theme"] as const;

export type RemovableToolbarIcons = (typeof RTBI)[number];
export const allRemovableToolbarIcons: RemovableToolbarIcons[] = [...RTBI];
export type dockContentType =
  | { content: "spaces"; id: which }
  | { content: "bookmark"; id: string };

export type LayoutSliceType = {
  toolBarPosition: ToolBarPositions;
  toolBarIcons: RemovableToolbarIcons[];
  locked: boolean;
  dock: boolean;
  dockContent: dockContentType;
  n_rows: number;
  n_cols: number;

  currentSpace: CurrentSpaceType;
  allSpaces: DynamicSpaceType[];
};

const height = 94;
const width = 97;
export type positionPropsType = Record<ToolBarPositions, Record<majorComponentsProps, BoxProps>>;
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
