import {
  ToolBarPositions,
  CurrentSpaceType,
  DynamicSpaceType,
  RemovableToolbarIcons,
  dockContentType,
  LayoutSliceType,
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
import { which } from "@/hooks/useAllSpaceAndIcon";

const getEmptySpace = (): DynamicSpaceType => {
  return {
    name: "name",
    id: 0,
    widgets: [],
    delete_able: true,
    icon: "majesticons:planet-rocket-line",
  };
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: { ...initialLayoutState },
  reducers: {
    changeCurrentSpace: (state, action: PayloadAction<CurrentSpaceType>) => {
      if (JSON.stringify(state.currentSpace) === JSON.stringify(action.payload)) return;
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
    changeDockContent: (state, action: PayloadAction<dockContentType>) => {
      state.dockContent = action.payload;
    },
    changeDockContentType: (state, action: PayloadAction<string>) => {
      const dockContentType = action.payload;
      if (dockContentType === "spaces") {
        state.dockContent = { content: "spaces", id: "all" };
      } else if (dockContentType === "bookmark") {
        state.dockContent = { content: "bookmark", id: "favorites" };
      }
    },
    changeDockSelected: (state, action: PayloadAction<string>) => {
      if (state.dockContent.content === "spaces") {
        if (["all", "dynamic", "static"].includes(action.payload)) {
          state.dockContent = {
            content: "spaces",
            id: action.payload as which,
          };
        }
      } else {
        state.dockContent = { content: "bookmark", id: action.payload };
      }
    },
    reorderSpaces: (state, action: PayloadAction<DynamicSpaceType[]>) => {
      state.allSpaces = action.payload;
    },

    toggleLocked: (state) => {
      state.locked = !state.locked;
    },
    toggleDock: (state) => {
      state.dock = !state.dock;
    },
    toggleIcon: (state, action: PayloadAction<RemovableToolbarIcons>) => {
      if (state.toolBarIcons.includes(action.payload)) {
        state.toolBarIcons = state.toolBarIcons.filter((p) => p !== action.payload);
      } else {
        state.toolBarIcons.push(action.payload);
      }
    },

    deleteSpace: (state, action: PayloadAction<number>) => {
      const space = state.allSpaces.find((p) => p.id === action.payload);
      if (space && space.delete_able) {
        state.allSpaces = state.allSpaces.filter((p) => p.id !== action.payload);
      }
    },
    duplicateSpace: (state, action: PayloadAction<number>) => {
      const space = state.allSpaces.find((p) => p.id === action.payload);
      if (space) {
        const newID = getNextId(state.allSpaces.map(({ id }) => id));
        state.allSpaces.push({ ...space, id: newID, delete_able: true });
        state.currentSpace = { type: "dynamic", id: newID };
      }
    },

    currentSpaceAddWidget: (state, action: PayloadAction<WidgetType>) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);

      if (space && state.currentSpace.type === "dynamic") {
        const newWidget = action.payload;
        var id = newWidget.values.id;
        if (uncontrolledWidgets.includes(action.payload.type as uncontrolledWidgetsType)) {
          id = getNextId(space.widgets.map(({ values: { id } }) => id));
          newWidget.values.id = id;
        }
        newWidget.gridProps.i = `${action.payload.type}-${id}`;
        space.widgets.push(newWidget);
      }
    },
    currentSpaceEditWidget: (state, action: PayloadAction<WidgetMappingUncontrolled>) => {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        const widget = space.widgets.find((p) => p.values.id === action.payload.values.id);
        if (widget) {
          widget.values = action.payload.values;
        }
      }
    },
    currentSpaceDeleteWidget(state, action: PayloadAction<DeleteWidgetParameters>) {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.widgets = space.widgets.filter(
          (p) => !(p.values.id === action.payload.id && p.type === action.payload.type)
        );
      }
    },
    currentSpaceSetGridProps(state, action: PayloadAction<Layout[]>) {
      const space = state.allSpaces.find((p) => p.id === state.currentSpace.id);
      if (space && state.currentSpace.type === "dynamic") {
        space.widgets = space.widgets.map((widget) => {
          const newWidget = action.payload.find((w) => w.i === widget.gridProps.i);
          return {
            ...widget,
            gridProps: { ...widget.gridProps, ...newWidget },
          };
        });
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

    resetLayoutState: (state) => Object.assign(state, initialLayoutState),
    setState: (state, action: PayloadAction<{ value: LayoutSliceType; check?: boolean }>) => {
      const { value, check = true } = action.payload;
      const val = value;
      if (!val || !val.allSpaces) return;
      if (!Array.isArray(val.allSpaces)) return;
      if (!check) return Object.assign(state, val);

      if (val.toolBarPosition) state.toolBarPosition = val.toolBarPosition;
      if (val.toolBarIcons) state.toolBarIcons = val.toolBarIcons;
      if (typeof val.dock === "boolean") state.dock = val.dock;
      if (val.currentSpace) state.currentSpace = val.currentSpace;
      if (val.dockContent && val.dockContent.content === "bookmark")
        state.dockContent = { content: "bookmark", id: "0" };
      else state.dockContent = val.dockContent;

      const allSpaces = [...state.allSpaces];

      for (const space of val.allSpaces) {
        const s = allSpaces.find((p) => p.id === space.id);
        if (s && (!space.delete_able || space.name === s.name)) Object.assign(s, space);
        else {
          const id = getNextId(allSpaces.map(({ id }) => id));
          if (space.id === val.currentSpace?.id) state.currentSpace = { type: "dynamic", id };
          allSpaces.push({ ...space, id, delete_able: true });
        }
      }

      state.allSpaces = allSpaces;
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
  currentSpaceRename,
  currentSpaceEditWidget,
  currentSpaceChangeIcon,
  toggleDock,
  changeDockContent,
  changeDockContentType,
  changeDockSelected,
  deleteSpace,
  duplicateSpace,
  resetLayoutState,
  toggleLocked,
  setState,
  reorderSpaces,
} = layoutSlice.actions;

export default layoutSlice.reducer;
