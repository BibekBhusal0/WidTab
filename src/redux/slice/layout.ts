import {
  compactionType,
  ToolBarPositions,
  CurrentSpaceType,
  DynamicSpaceType,
  LayoutSliceType,
  RemovableToolbarIcons,
} from "@/types/slice/layout";
import {
  allWidgetsType,
  uncontrolledWidgets,
  uncontrolledWidgetsType,
  WidgetType,
} from "@/types/slice/widgets";
import { getNextId } from "@/utils/next_id";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";

const getEmptySpace = (): DynamicSpaceType => {
  return {
    name: "name",
    compaction: "none",
    id: 0,
    locked: true,
    widgets: [],
    delete_able: true,
  };
};

const initialState: LayoutSliceType = {
  linkInNewTab: false,
  toolBarPosition: "bottom",
  toolBarIcons: ["lock", "spaces", "todo"],
  n_rows: 8,
  n_cols: 12,
  currentSpace: { type: "dynamic", id: 2 },
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
            w: 4,
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
            x: 4,
            y: 0,
            w: 4,
            h: 3,
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
            w: 4,
            h: 3,
            i: "2",
          },
        },
      ],
    },
    {
      ...getEmptySpace(),
      id: 2,
      delete_able: false,
      name: "test",
      widgets: [
        {
          type: "clock",
          values: { id: 2, clockType: "digital", TwentyFourHour: true },
          gridProps: { i: "2", x: 7, y: 0, w: 3, h: 4 },
        },
        {
          type: "calendar",
          values: { id: 3 },
          gridProps: {
            i: "3",
            x: 2,
            y: 0,
            w: 3,
            h: 4,
            isResizable: false,
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
    addSpace: (state, action: PayloadAction<string>) => {
      const newID = getNextId(state.allSpaces.map(({ id }) => id));
      state.allSpaces.push({
        ...getEmptySpace(),
        id: newID,
        name: action.payload,
      });
      state.currentSpace = { type: "dynamic", id: newID };
    },
    changeToolBarPosition: (state, action: PayloadAction<ToolBarPositions>) => {
      state.toolBarPosition = action.payload;
    },
    toggleLink: (state) => {
      state.linkInNewTab = !state.linkInNewTab;
    },
    toggleIcon: (state, action: PayloadAction<RemovableToolbarIcons>) => {
      if (state.toolBarIcons.includes(action.payload)) {
        state.toolBarIcons = state.toolBarIcons.filter(
          (p) => p !== action.payload
        );
      } else {
        state.toolBarIcons.push(action.payload);
      }
    },

    currentSpaceAddWidget: (state, action: PayloadAction<WidgetType>) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);

      if (space && state.currentSpace.type === "dynamic") {
        if (
          uncontrolledWidgets.includes(
            action.payload.type as uncontrolledWidgetsType
          )
        ) {
          const id = getNextId(space.widgets.map(({ values: { id } }) => id));
          const values = action.payload.values;
          values.id = id;
          const newWidget = action.payload;
          newWidget.gridProps.i = `${action.payload.type}-${id}`;
          newWidget.values.id = id;
          space.widgets.push(newWidget);
        } else space.widgets.push(action.payload);
      }
    },
    currentSpaceDeleteWidget(
      state,
      action: PayloadAction<{ type: allWidgetsType; id: number }>
    ) {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.widgets = space.widgets.filter(
          (p) =>
            !(
              p.values.id === action.payload.id &&
              p.type === action.payload.type
            )
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
    currentSpaceDeleteSpace: (state) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        if (space.delete_able) {
          state.allSpaces = state.allSpaces.filter((p) => p.id !== space.id);
        }
      }
    },
    currentSpaceRename: (state, action: PayloadAction<string>) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.name = action.payload;
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
      action: PayloadAction<compactionType>
    ) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.compaction = action.payload;
      }
    },
    currentSpaceDuplicate: (state) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        const newID = getNextId(state.allSpaces.map(({ id }) => id));
        state.allSpaces.push({ ...space, id: newID, delete_able: true });
        state.currentSpace = { type: "dynamic", id: newID };
      }
    },
  },
});

export const {
  changeCurrentSpace,
  addSpace,
  currentSpaceAddWidget,
  currentSpaceDeleteWidget,
  currentSpaceSetGridProps,
  currentSpaceDeleteSpace,
  currentSpaceToggleLocked,
  currentSpaceChangeCompaction,
  currentSpaceDuplicate,
  currentSpaceRename,
  changeToolBarPosition,
  toggleLink,
  toggleIcon,
} = layoutSlice.actions;

export default layoutSlice.reducer;
