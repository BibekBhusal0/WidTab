import { HabitTrackerSliceType } from "@/types/slice/habit-tracker";
import { LayoutSliceType } from "@/types/slice/layout";
import { ThemeSliceType } from "@/types/slice/theme";
import { todoStateType } from "@/types/slice/todo";
import { noteStateType } from "@/types/slice/notes";
import { bookmarkSliceType } from "@/types/slice/bookmark";

export const initialThemeState: ThemeSliceType = {
  currentThemeID: 2,
  allThemes: [
    {
      name: "red",
      mode: "light",
      id: 1,
      editAble: false,
      primaryColor: "#ff0000",
      blur: 1,
      roundness: 0.7,
      opacity: 0.4,
      iconPack: "Remix Icon Line",
    },
    {
      name: "green",
      mode: "dark",
      id: 2,
      editAble: true,
      primaryColor: "#00ff00",
      blur: 0.5,
      roundness: 0.3,
      opacity: 0.7,
      iconPack: "hugeicons",
    },
    {
      name: "blue",
      mode: "light",
      id: 0,
      editAble: true,
      primaryColor: "#0000ff",
      blur: 0,
      roundness: 0.2,
      opacity: 1,
      iconPack: "line-md",
    },
  ],
};

export const initialTodoState: todoStateType = {
  pinnedTodo: null,
  Tasks: [
    {
      filtered: false,
      id: 1,
      sorted: false,
      icon: "fluent:sparkle-16-filled",
      title: "Customize new tab",
      todos: [
        { id: 1, task: "Install this extension", checked: true },
        { id: 2, task: "Add different widgets in home", checked: false },
        { id: 3, task: "Add Spaces", checked: false },
        { id: 4, task: "Make New Theme", checked: false },
      ],
    },
  ],
};

export const initialLayoutState: LayoutSliceType = {
  toolBarPosition: "bottom",
  locked: true,
  dock: true,
  toolBarIcons: ["lock", "theme"],
  n_rows: 8,
  n_cols: 12,
  dockContent: { content: "spaces", id: "all" },
  currentSpace: {
    type: "dynamic",
    id: 1,
  },
  allSpaces: [
    {
      name: "Home",
      id: 1,
      icon: "jam:home-f",
      widgets: [
        {
          type: "todo",
          values: { id: 1 },
          gridProps: { minW: 3, minH: 4, x: 0, y: 0, w: 4, h: 4, i: "todo-1" },
        },
        {
          type: "note",
          values: { id: 1 },
          gridProps: { minW: 3, minH: 4, x: 5, y: 0, w: 3, h: 4, i: "note-1" },
        },
      ],
      delete_able: false,
    },
  ],
};

export const initialHabitTrackerState: HabitTrackerSliceType = {
  pinned: null,
  trackers: [],
  timerHistory: {},
};

export const initialNoteState: noteStateType = {
  allNotes: [
    {
      id: 1,
      icon: "gg:toolbar-bottom",
      title: "Dock",
      text: "Dock appears on the middle of toolbar.\nIt can be disabled from settings.\n\nDock can be used to navigate between spaces or links. It can contain either static spaces or dynamic spaces or all spaces or any folder of bookmark.",
    },
    {
      title: "Dynamic and static Spaces",
      id: 2,
      text: "In this extension there are two types of spaces dynamic and static spaces.\n\nIn dynamic space, different widgets can be added and moved around. There can be many Dynamic widgets.\n\nStatic space can't be customized as dynamic widget it contains all bookmark or all notes or all habit trackers or all todo list. New Static space can't be added. ",
      icon: "flowbite:rocket-solid",
    },
  ],
};

export const initialBookmarkState: bookmarkSliceType = {
  favorites: [],
  showFavorites: false,
  linkInNewTab: true,
  currentFolderID: "1",
  folderSize: "medium",
};
