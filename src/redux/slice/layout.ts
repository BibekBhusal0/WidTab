import {
  CurrentSpaceType,
  DynamicSpaceType,
  LayoutSliceType,
} from "@/types/slice/layout";
import { WidgetType } from "@/types/slice/widgets";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";

const getEmptySpace = (): DynamicSpaceType => {
  return {
    compaction: "none",
    id: 0,
    locked: false,
    widgets: [],
    delete_able: true,
  };
};

const initialState: LayoutSliceType = {
  n_rows: 8,
  n_cols: 12,
  currentSpace: { type: "dynamic", id: 1 },
  allSpaces: [
    {
      ...getEmptySpace(),
      id: 1,
      delete_able: false,
      widgets: [
        {
          gridProps: {
            x: 0,
            y: 0,
            w: 3,
            h: 5,
            i: "0",
          },
          type: "custom",
          values: {
            id: 0,
            url: "https://open.spotify.com/embed/playlist/1Q3d70G34mwRmhrKJ5KdZM?utm_source=generator",
          },
        },
        {
          type: "custom",
          values: {
            id: 1,
            url: "https://indify.co/widgets/live/weather/6IrFOuag2Pz5NlkM9qFw",
          },
          gridProps: {
            isResizable: true,
            x: 3,
            y: 0,
            w: 6,
            h: 2,
            i: "1",
          },
        },
        {
          type: "custom",
          values: {
            id: 2,
            url: "https://flipclock.app/",
          },
          gridProps: {
            x: 0,
            y: 5,
            w: 3,
            h: 3,
            i: "2",
          },
        },
      ],
    },
  ],
};

export const layoutSlice = createSlice({
  name: "layouts",
  initialState,
  reducers: {
    changeCurrentSpace: (state, action: PayloadAction<CurrentSpaceType>) => {
      if (JSON.stringify(state.currentSpace) === JSON.stringify(action.payload))
        return;
      if (action.payload.type === "dynamic") {
        if (!state.allSpaces.find((p) => p.id === action.payload.id)) return;
      }
      state.currentSpace = action.payload;
    },
    deleteSpace: (state, action: PayloadAction<number>) => {
      const space = state.allSpaces.find((p) => p.id === action.payload);
      if (space?.delete_able) {
        state.allSpaces = state.allSpaces.filter(
          (p) => p.id !== action.payload
        );
      }
    },
    addSpace: (state) => {
      const newID = getNextId(state.allSpaces.map(({ id }) => id));
      state.allSpaces.push({ ...getEmptySpace(), id: newID });
      state.currentSpace = { type: "dynamic", id: newID };
    },
    currentSpaceAddWidget: (state, action: PayloadAction<WidgetType>) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.widgets.push(action.payload);
      }
    },
    currentSpaceDeleteWidget(state, action: PayloadAction<number>) {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.widgets = space.widgets.filter(
          (p) => p.values.id !== action.payload
        );
      }
    },
    currentSpaceSetGridProps(state, action: PayloadAction<Layout[]>) {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.widgets = space.widgets.map((widget) => {
          const newWidget = action.payload.find(
            (w) => w.i === widget.gridProps.i
          );
          return {
            ...widget,
            gridProps: { ...widget.gridProps, ...newWidget },
          };
        });
      }
    },
    currentStateDeleteState: (state) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        if (space.delete_able) {
          state.allSpaces = state.allSpaces.filter((p) => p.id !== space.id);
        }
      }
    },
    currentSpaceToggleLocked: (state) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.locked = !space.locked;
      }
    },
    currentSpaceChangeCompaction: (
      state,
      action: PayloadAction<"horizontal" | "vertical" | "none">
    ) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.compaction = action.payload;
      }
    },
  },
});

export const {
  changeCurrentSpace,
  deleteSpace,
  addSpace,
  currentSpaceAddWidget,
  currentSpaceDeleteWidget,
  currentSpaceSetGridProps,
  currentStateDeleteState,
  currentSpaceToggleLocked,
  currentSpaceChangeCompaction,
} = layoutSlice.actions;

export default layoutSlice.reducer;
