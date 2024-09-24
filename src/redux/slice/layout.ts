import {
  CurrentSpaceType,
  DynamicSpaceType,
  LayoutSliceType,
} from "@/types/slice/layout";
import { WidgetType } from "@/types/slice/widgets";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Layout } from "react-grid-layout";

const getEmptySpace = (): DynamicSpaceType => {
  return {
    compaction: "none",
    id: uuidv4(),
    locked: false,
    widgets: [],
    delete_able: true,
  };
};

const initialState: LayoutSliceType = {
  n_rows: 8,
  n_cols: 12,
  currentSpace: { type: "dynamic", id: "1" },
  allSpaces: [
    {
      ...getEmptySpace(),
      id: "1",
      delete_able: false,
      widgets: [
        {
          gridProps: {
            x: 8,
            y: 6,
            w: 4,
            h: 2,
            i: "0",
          },
          type: "custom",
          values: {
            id: "0",

            url: "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=%2Fpueblovista%2Fmorning-coffee-mixtape-chillhop-lofi-hip-hop%2F",
          },
        },
        {
          type: "custom",
          values: {
            id: "1",
            url: "https://indify.co/widgets/live/weather/6IrFOuag2Pz5NlkM9qFw",
          },
          gridProps: {
            isResizable: true,
            x: 0,
            y: 0,
            w: 2,
            h: 4,
            i: "1",
          },
        },
        {
          type: "custom",
          values: {
            id: "2",
            url: "https://flipclock.app/",
          },
          gridProps: {
            x: 4,
            y: 0,
            w: 4,
            h: 3,
            i: "2",
          },
        },
        {
          type: "custom",
          values: {
            id: "3",
            url: "https://getkairo.com/embed-local?id=07770ed8-bc63-47d5-9075-2b783d0209a7&local=true&title=Focus&type=Block&color=amber&size=3&faceType=default",
          },
          gridProps: {
            x: 9,
            y: 1,
            w: 3,
            h: 5,
            i: "3",
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
    deleteSpace: (state, action: PayloadAction<string>) => {
      const space = state.allSpaces.find((p) => p.id === action.payload);
      if (space?.delete_able) {
        state.allSpaces = state.allSpaces.filter(
          (p) => p.id !== action.payload
        );
      }
    },
    addSpace: (state) => {
      const newID = uuidv4();
      state.allSpaces.push({ ...getEmptySpace(), id: newID });
      state.currentSpace = { type: "dynamic", id: newID };
    },
    currentSpaceAddWidget: (state, action: PayloadAction<WidgetType>) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space) {
        space.widgets.push(action.payload);
      }
    },
    currentSpaceDeleteWidget(state, action: PayloadAction<string>) {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space) {
        space.widgets = space.widgets.filter(
          (p) => p.values.id !== action.payload
        );
      }
    },
    currentSpaceSetGridProps(state, action: PayloadAction<Layout[]>) {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space) {
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
      if (space) {
        if (space.delete_able) {
          state.allSpaces = state.allSpaces.filter((p) => p.id !== space.id);
        }
      }
    },
    currentSpaceToggleLocked: (state) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space) {
        space.locked = !space.locked;
      }
    },
    currentSpaceChangeCompaction: (
      state,
      action: PayloadAction<"horizontal" | "vertical" | "none">
    ) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space) {
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
