import { HabitTrackerSliceType } from "@/types/slice/habit-tracker";
import { LayoutSliceType } from "@/types/slice/layout";
import { ThemeSliceType } from "@/types/slice/theme";
import { todoStateType } from "@/types/slice/todo";
import { noteStateType } from "@/types/slice/notes";
import { bookmarkSliceType } from "@/types/slice/bookmark";

import autumn from "@/assets/img/autumn.jpg";
import bananas from "@/assets/img/bananas.jpg";
import ocean from "@/assets/img/ocean.jpg";
import rose from "@/assets/img/rose.jpg";
import space from "@/assets/img/space.jpg";

export const initialThemeState: ThemeSliceType = {
  currentThemeID: 5,
  allThemes: [
    {
      name: "Under Water",
      mode: "light",
      id: 0,
      editAble: false,
      primaryColor: "#4870e8",
      blur: 0.71,
      roundness: 0.87,
      opacity: 0.6,
      iconPack: "Remix Icon Filled",
      image: ocean,
    },
    {
      name: "Autumn",
      mode: "light",
      id: 1,
      editAble: false,
      primaryColor: "#ee6011",
      blur: 0.68,
      roundness: 0.03,
      opacity: 0.6,
      iconPack: "Teeny Icons Solid",
      image: autumn,
    },
    {
      name: "Monkey",
      mode: "dark",
      id: 2,
      editAble: true,
      primaryColor: "#f2ff00",
      blur: 0.67,
      roundness: 0.65,
      opacity: 0.65,
      iconPack: "line-md",
      image: bananas,
    },
    {
      name: "Depp Space",
      mode: "dark",
      id: 3,
      editAble: false,
      primaryColor: "#8f00ff",
      blur: 0.54,
      roundness: 0.36,
      opacity: 0.55,
      iconPack: "Solar Bold Duotone",
      image: space,
    },
    {
      name: "Rose",
      mode: "dark",
      id: 4,
      editAble: false,
      primaryColor: "#ef4d9b",
      blur: 1,
      roundness: 0.24,
      opacity: 0.75,
      iconPack: "MingCute Fill",
      image: rose,
    },
    {
      name: "Simple",
      mode: "dark",
      id: 5,
      editAble: true,
      primaryColor: "#00ff00",
      blur: 0.55,
      roundness: 0.24,
      opacity: 0.85,
      iconPack: "Bootstrap Fill",
    },
  ],
};

export const initialTodoState: todoStateType = {
  pinnedTodo: null,
  Tasks: [
    {
      filtered: false,
      id: 1,
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
  folderIcons: {
  },
};
