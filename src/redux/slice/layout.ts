import {
  compactionType,
  ToolBarPositions,
  CurrentSpaceType,
  DynamicSpaceType,
  LayoutSliceType,
  RemovableToolbarIcons,
} from "@/types/slice/layout";
import {
  DeleteWidgetParameters,
  uncontrolledWidgets,
  uncontrolledWidgetsType,
  WidgetMappingUncontrolled,
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
  linkInNewTab: true,
  toolBarPosition: "bottom",
  toolBarIcons: ["lock", "spaces", "todo"],
  n_rows: 8,
  n_cols: 12,
  currentSpace: {
    type: "dynamic",
    id: 1,
  },
  allSpaces: [
    {
      name: "Home",
      compaction: "none",
      id: 1,
      locked: true,
      widgets: [
        {
          type: "custom",
          values: {
            id: 1,
            url: "https://indify.co/widgets/live/weather/6IrFOuag2Pz5NlkM9qFw",
          },
          gridProps: {
            isResizable: true,
            x: 5,
            y: 3,
            w: 3,
            h: 4,
            i: "1",
          },
        },
        {
          type: "search",
          gridProps: {
            maxH: 1,
            minW: 4,
            w: 7,
            h: 1,
            x: 3,
            y: 2,
            i: "search-2",
          },
          values: {
            id: 2,
            engine: "DuckDuckGo",
          },
        },
        {
          type: "clock",
          gridProps: {
            w: 3,
            h: 2,
            maxH: 5,
            maxW: 8,
            minH: 1,
            minW: 2,
            x: 5,
            y: 0,
            i: "clock-3",
          },
          values: {
            id: 3,
            TwentyFourHour: true,
            clockType: "digital",
            showSeconds: false,
          },
        },
        {
          type: "calendar",
          gridProps: {
            w: 3,
            h: 4,
            minH: 4,
            minW: 3,
            maxH: 4,
            maxW: 3,
            x: 2,
            y: 3,
            i: "calendar-5",
          },
          values: {
            id: 5,
          },
        },
        {
          type: "todo",
          values: {
            id: 1,
          },
          gridProps: {
            minW: 3,
            minH: 4,
            w: 3,
            h: 4,
            x: 8,
            y: 3,
            i: "todo-1",
          },
        },
      ],
      delete_able: false,
    },
    {
      name: "Full",
      compaction: "none",
      id: 2,
      locked: true,
      widgets: [
        {
          type: "clock",
          gridProps: {
            w: 3,
            h: 4,
            maxH: 5,
            maxW: 8,
            minH: 1,
            minW: 2,
            x: 0,
            y: 0,
            i: "clock-1",
          },
          values: {
            id: 1,
            TwentyFourHour: true,
            clockType: "analog",
            showSeconds: true,
          },
        },
        {
          type: "todo",
          values: {
            id: 3,
          },
          gridProps: {
            minW: 3,
            minH: 4,
            w: 3,
            h: 5,
            x: 9,
            y: 0,
            i: "todo-3",
          },
        },
        {
          gridProps: {
            x: 3,
            y: 1,
            w: 3,
            h: 7,
            i: "custom-2",
          },
          type: "custom",
          values: {
            id: 2,
            url: "https://open.spotify.com/embed/playlist/1Q3d70G34mwRmhrKJ5KdZM",
          },
        },
        {
          gridProps: {
            x: 0,
            y: 4,
            w: 3,
            h: 4,
            i: "custom-4",
          },
          type: "custom",
          values: {
            id: 4,
            url: "https://getkairo.com/embed-local?id=829e8a7f-89ef-4ca2-a7be-c018ac5de3ba&local=true&title=Write%20one%20hour&type=Block&color=lightblue&size=1&faceType=default&darkMode=true",
          },
        },
        {
          gridProps: {
            x: 6,
            y: 1,
            w: 3,
            h: 7,
            i: "custom-6",
          },
          type: "custom",
          values: {
            id: 6,
            url: "https://www.chess.com/emboard?id=12234671",
          },
        },
        {
          type: "search",
          gridProps: {
            maxH: 1,
            minW: 4,
            w: 6,
            h: 1,
            x: 3,
            y: 0,
            i: "search-5",
          },
          values: {
            id: 5,
            engine: "YouTube",
          },
        },
        {
          gridProps: {
            x: 9,
            y: 5,
            w: 3,
            h: 3,
            i: "custom-7",
          },
          type: "custom",
          values: {
            id: 7,
            url: "https://notion-quote.studiorach.com",
          },
        },
      ],
      delete_able: false,
    },
    {
      name: "New",
      compaction: "none",
      id: 3,
      locked: false,
      widgets: [
        {
          gridProps: {
            x: 1,
            y: 0,
            w: 4,
            h: 2,
            i: "habit-tracker-1",
          },
          type: "habit-tracker",
          values: {
            id: 1,
          },
        },
      ],
      delete_able: true,
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
        const newWidget = action.payload;
        var id = newWidget.values.id;
        if (
          uncontrolledWidgets.includes(
            action.payload.type as uncontrolledWidgetsType
          )
        ) {
          id = getNextId(space.widgets.map(({ values: { id } }) => id));
          newWidget.values.id = id;
        }
        newWidget.gridProps.i = `${action.payload.type}-${id}`;
        space.widgets.push(newWidget);
      }
    },
    currentSpaceEditWidget: (
      state,
      action: PayloadAction<WidgetMappingUncontrolled>
    ) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        const widget = space.widgets.find(
          (p) => p.values.id === action.payload.values.id
        );
        if (widget) {
          widget.values = action.payload.values;
        }
      }
    },
    currentSpaceDeleteWidget(
      state,
      action: PayloadAction<DeleteWidgetParameters>
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
  changeToolBarPosition,
  addSpace,
  toggleLink,
  toggleIcon,
  currentSpaceAddWidget,
  currentSpaceDeleteWidget,
  currentSpaceSetGridProps,
  currentSpaceDeleteSpace,
  currentSpaceToggleLocked,
  currentSpaceChangeCompaction,
  currentSpaceDuplicate,
  currentSpaceRename,
  currentSpaceEditWidget,
} = layoutSlice.actions;

export default layoutSlice.reducer;
