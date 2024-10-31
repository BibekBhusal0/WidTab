import {
  compactionType,
  ToolBarPositions,
  CurrentSpaceType,
  DynamicSpaceType,
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
import { initialLayoutState } from "./initialStates";

const getEmptySpace = (): DynamicSpaceType => {
  return {
    name: "name",
    compaction: "none",
    id: 0,
    locked: true,
    widgets: [],
    delete_able: true,
    icon: "majesticons:planet-rocket-line",
  };
};

export const layoutSlice = createSlice({
  name: "layouts",
  initialState: initialLayoutState,
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

    toggleDock: (state) => {
      state.dock = !state.dock;
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
          console.log(action.payload.values);
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
    currentSpaceChangeIcon: (state, action: PayloadAction<string>) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.icon = action.payload;
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
  currentSpaceChangeIcon,
  toggleDock,
} = layoutSlice.actions;

export default layoutSlice.reducer;
