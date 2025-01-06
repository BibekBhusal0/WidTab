import {
  ToolBarPositions,
  CurrentSpaceType,
  RemovableToolbarIcons,
  dockContentType,
  layoutStateType,
} from "@/types/slice/layout";
import {
  DeleteWidgetParameters,
  WidgetMappingUncontrolled,
  WidgetType,
} from "@/types/slice/widgets";
import { Layout } from "react-grid-layout";
import { initialLayoutState } from "./initialStates";
import { which } from "@/hooks/useAllSpaceAndIcon";
import { getFromStorage, setInStorage, STORAGE_KEYS } from "./";
import { getNextId } from "@/utils/next_id";

const LAYOUT_STORAGE_KEY = STORAGE_KEYS.layout;
export const getNoteState = async () => {
  return (
    ((await getFromStorage(LAYOUT_STORAGE_KEY)) as layoutStateType) || {
      ...initialLayoutState,
    }
  );
};
export async function getSpace(id: number) {
  const state = await getNoteState();
  return state.allSpaces.find((p) => p.id === id);
}
export function fixState(state: layoutStateType) {
  const val = state;
  const newState = { ...state };
  if (!val) return false;
  if (!val.allSpaces) return false;
  if (!Array.isArray(val.allSpaces)) return false;
  if (val.toolBarPosition) newState.toolBarPosition = val.toolBarPosition;
  if (val.toolBarIcons) newState.toolBarIcons = val.toolBarIcons;
  if (typeof val.dock === "boolean") newState.dock = val.dock;
  if (val.currentSpace) newState.currentSpace = val.currentSpace;
  if (val.dockContent && val.dockContent.content === "bookmark")
    newState.dockContent = { content: "bookmark", id: "0" };
  else newState.dockContent = val.dockContent;

  const allSpaces = [...newState.allSpaces];

  for (const space of val.allSpaces) {
    const s = allSpaces.find((p) => p.id === space.id);
    if (s && (!space.delete_able || space.name === s.name))
      Object.assign(s, space);
    else {
      const id = getNextId(allSpaces.map(({ id }) => id));
      if (space.id === val.currentSpace?.id)
        newState.currentSpace = { type: "dynamic", id };
      allSpaces.push({ ...space, id, delete_able: true });
    }
  }

  newState.allSpaces = allSpaces;
  return newState;
}

export async function changeCurrentSpace(space: CurrentSpaceType) {
  const state = await getNoteState();
  const newLayout: layoutStateType = { ...state, currentSpace: space };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function addSpace(name: string) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: [
      ...state.allSpaces,
      {
        name,
        id: getNextId(state.allSpaces.map(({ id }) => id)),
        delete_able: true,
        icon: "majesticons:planet-rocket-line",
        widgets: [],
      },
    ],
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function removeSpace(id: number) {
  const state = await getNoteState();
  const space = await getSpace(id);
  if (!space || !space.delete_able) return;
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.filter((space) => space.id !== id),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function changeToolBarPosition(position: ToolBarPositions) {
  const state = await getNoteState();
  const newLayout: layoutStateType = { ...state, toolBarPosition: position };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function toggleIcon(icon: RemovableToolbarIcons) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    toolBarIcons: state.toolBarIcons.includes(icon)
      ? state.toolBarIcons.filter((p) => p !== icon)
      : [...state.toolBarIcons, icon],
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function toggleDock() {
  const state = await getNoteState();
  const newLayout: layoutStateType = { ...state, dock: !state.dock };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function changeDockContent(content: dockContentType) {
  const state = await getNoteState();
  const newLayout: layoutStateType = { ...state, dockContent: content };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function changeDockSelected(type: string) {
  const state = await getNoteState();
  if (state.dockContent.content === "spaces") {
    if (["all", "dynamic", "static"].includes(type)) {
      const newLayout: layoutStateType = {
        ...state,
        dockContent: { content: "spaces", id: type as which },
      };
      setInStorage(LAYOUT_STORAGE_KEY, newLayout);
    }
  } else {
    const newLayout: layoutStateType = {
      ...state,
      dockContent: { content: "bookmark", id: type },
    };
    setInStorage(LAYOUT_STORAGE_KEY, newLayout);
  }
}
export async function currentSpaceAddWidget(widget: WidgetType) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.map((space) => {
      if (space.id === state.currentSpace?.id) {
        return {
          ...space,
          widgets: [...space.widgets, widget],
        };
      }
      return space;
    }),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function currentSpaceDeleteWidget(params: DeleteWidgetParameters) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.map((space) => {
      if (space.id === state.currentSpace?.id) {
        return {
          ...space,
          widgets: space.widgets.filter(
            (widget) =>
              !(widget.values.id === params.id && widget.type === params.type)
          ),
        };
      }
      return space;
    }),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function currentSpaceSetGridProps(l: Layout[]) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.map((space) => {
      if (
        space.id === state.currentSpace.id &&
        state.currentSpace.type === "dynamic"
      ) {
        return { ...space, widgets: { ...space.widgets, layout: l } };
      }
      return space;
    }),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function currentSpaceRename(name: string) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.map((space) => {
      if (space.id === state.currentSpace.id) {
        return { ...space, name };
      }
      return space;
    }),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function currentSpaceEditWidget(
  widget: WidgetMappingUncontrolled
) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.map((space) => {
      if (space.id === state.currentSpace.id) {
        return {
          ...space,
          widgets: space.widgets.map((w) => {
            if (w.values.id === widget.values.id) {
              return { ...w, ...widget };
            }
            return w;
          }),
        };
      }
      return space;
    }),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function currentSpaceChangeIcon(icon: string) {
  const state = await getNoteState();
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.map((space) => {
      if (space.id === state.currentSpace.id) {
        return { ...space, icon };
      }
      return space;
    }),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}

export async function deleteSpace(id: number) {
  const state = await getNoteState();
  const space = await getSpace(id);
  if (!space || !space.delete_able) return;
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: state.allSpaces.filter((space) => space.id !== id),
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export async function duplicateSpace(id: number) {
  const state = await getNoteState();
  const space = await getSpace(id);
  if (!space) return;
  const newLayout: layoutStateType = {
    ...state,
    allSpaces: [
      ...state.allSpaces,
      {
        ...space,
        id: getNextId(state.allSpaces.map(({ id }) => id)),
        delete_able: false,
      },
    ],
  };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}

export function resetLayoutState() {
  setInStorage(LAYOUT_STORAGE_KEY, initialLayoutState);
}
export async function toggleLocked() {
  const state = await getNoteState();
  const newLayout: layoutStateType = { ...state, locked: !state.locked };
  setInStorage(LAYOUT_STORAGE_KEY, newLayout);
}
export function setLayoutState(state: layoutStateType) {
  const newState = fixState(state);
  if (newState) setInStorage(LAYOUT_STORAGE_KEY, newState);
}
