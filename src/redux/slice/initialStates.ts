import { HabitTrackerSliceType } from "@/types/slice/habit-tracker";
import { LayoutSliceType } from "@/types/slice/layout";
import { ThemeSliceType } from "@/types/slice/theme";
import { todoStateType } from "@/types/slice/todo";

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
      sorted: false,
      filtered: false,
      id: 1,
      title: "All Tasks",
      icon: "fluent-mdl2:task-list",
      todos: [
        {
          id: 1,
          task: "Task 1",
          checked: true,
        },
        {
          id: 2,
          task: "Task 2",
          checked: true,
        },
        {
          id: 3,
          task: "Task 4",
          checked: false,
        },
        {
          id: 4,
          task: "Task 5",
          checked: false,
        },
      ],
    },
    {
      sorted: false,
      id: 2,
      filtered: false,
      title: "Today",
      icon: "tdesign:calendar-2",
      todos: [
        {
          id: 3,
          task: "Task 3",
          checked: false,
        },
      ],
    },
    {
      filtered: false,
      sorted: false,
      id: 3,
      icon: "mdi:brain-freeze",
      title: "Focus on these",
      todos: [
        {
          id: 1,
          task: "focus 1",
          checked: false,
        },
        {
          id: 2,
          task: "focus 2",
          checked: false,
        },
        {
          id: 3,
          task: "focus 3",
          checked: true,
        },
        {
          id: 4,
          task: "focus 4",
          checked: true,
        },
        {
          id: 5,
          task: "focus 5",
          checked: false,
        },
        {
          id: 6,
          task: "focus 6",
          checked: false,
        },
      ],
    },
  ],
};

export const initialLayoutState: LayoutSliceType = {
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
      icon: "jam:home-f",
      widgets: [
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
      icon: "mage:dashboard-fill",
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
      icon: "mage:trophy-fill",
      locked: true,
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

export const initialHabitTrackerState: HabitTrackerSliceType = {
  pinned: 3,
  trackers: [
    {
      id: 1,
      title: "Water Intake",
      icon: "ion:water",
      target: 2000,
      increment: 250,
      value: 1000,
      unit: "ml",
      history: {
        "2024-10-18": 500,
        "2024-10-19": 750,
        "2024-10-21": 1000,
        "2024-10-23": 1000,
      },
    },
    {
      id: 2,
      title: "Exercise",
      icon: "mdi:crossfit",
      target: 30,
      increment: 5,
      value: 15,
      unit: "min",
      history: {
        "2024-10-17": 10,
        "2024-10-20": 20,
        "2024-10-21": 15,
        "2024-10-23": 15,
      },
    },
    {
      id: 3,
      title: "Reading",
      icon: "mdi:book-open-page-variant",
      target: 20,
      increment: 2,
      value: 10,
      unit: "pages",
      history: {
        "2024-10-19": 5,
        "2024-10-21": 8,
        "2024-10-22": 10,
        "2024-10-23": 10,
      },
    },
    {
      id: 4,
      title: "Meditation",
      icon: "mdi:meditation",
      target: 15,
      increment: 3,
      value: 6,
      unit: "min",
      history: {
        "2024-10-18": 5,
        "2024-10-20": 8,
        "2024-10-22": 6,
        "2024-10-23": 6,
      },
    },
  ],
};
