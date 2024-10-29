import { HabitTrackerSliceType } from "@/types/slice/habit-tracker";
import { LayoutSliceType } from "@/types/slice/layout";
import { ThemeSliceType } from "@/types/slice/theme";
import { todoStateType } from "@/types/slice/todo";
import dayjs from "@/dayjsConfig";

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
      title: "Gardening",
      icon: "mdi:plant-outline",
      todos: [
        {
          id: 1,
          task: "Plant seasonal flowers",
          checked: true,
        },
        {
          id: 2,
          task: "Water and fertilize garden",
          checked: true,
        },
        {
          id: 3,
          task: "Design new garden layout",
          checked: false,
        },
        {
          id: 4,
          task: "Compost kitchen scrps for soil enrichment",
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
        { id: 1, task: "Task 1", checked: true },
        { id: 2, task: "Task 2", checked: true },
        { id: 3, task: "Task 3", checked: false },
        { id: 4, task: "Task 4", checked: false },
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
  dock: true,
  toolBarIcons: ["lock", "theme"],
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
            x: 7,
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
            x: 3,
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
            w: 4,
            h: 4,
            x: 6,
            y: 3,
            i: "todo-1",

            static: false,
          },
        },
        {
          gridProps: {
            minH: 2,
            minW: 4,
            maxH: 3,
            maxW: 5,
            x: 3,
            y: 0,
            w: 4,
            h: 2,
            i: "navigation-4",

            static: false,
          },
          type: "navigation",
          values: {
            id: 4,
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
            x: 9,
            y: 4,
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
            h: 4,
            x: 9,
            y: 0,
            i: "todo-3",
          },
        },
        {
          gridProps: {
            minW: 4,
            minH: 3,
            maxW: 4,
            x: 5,
            y: 2,
            w: 4,
            h: 6,
            i: "timer-2",
          },
          type: "timer",
          values: {
            id: 2,
            time: 90,
            music: true,
          },
        },
        {
          type: "habit-tracker",
          values: {
            id: 1,
          },
          gridProps: {
            minW: 4,
            minH: 2,
            maxH: 2,
            maxW: 8,
            x: 5,
            y: 0,
            w: 4,
            h: 2,
            i: "habit-tracker-1",
          },
        },
        {
          gridProps: {
            maxH: 1,
            minW: 4,
            x: 0,
            y: 0,
            w: 5,
            h: 1,
            i: "search-5",
          },
          type: "search",
          values: {
            id: 5,
            engine: "Google",
          },
        },
        {
          gridProps: {
            x: 0,
            y: 1,
            w: 5,
            h: 7,
            i: "custom-4",
          },
          type: "custom",
          values: {
            id: 4,
            url: "https://www.chess.com/emboard?id=12337843",
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
      title: "Water",
      icon: "ion:water",
      target: 2000,
      increment: 250,
      value: 1000,
      unit: "ml",
      history: {
        [dayjs().subtract(5, "day").format("YYYY-MM-DD")]: 1500,
        [dayjs().subtract(4, "day").format("YYYY-MM-DD")]: 1500,
        [dayjs().subtract(3, "day").format("YYYY-MM-DD")]: 1800,
        [dayjs().subtract(2, "day").format("YYYY-MM-DD")]: 1900,
        [dayjs().subtract(1, "day").format("YYYY-MM-DD")]: 2000,
        [dayjs().format("YYYY-MM-DD")]: 1200,
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
        [dayjs().subtract(5, "day").format("YYYY-MM-DD")]: 19,
        [dayjs().subtract(4, "day").format("YYYY-MM-DD")]: 25,
        [dayjs().subtract(3, "day").format("YYYY-MM-DD")]: 22,
        [dayjs().subtract(2, "day").format("YYYY-MM-DD")]: 34,
        [dayjs().subtract(1, "day").format("YYYY-MM-DD")]: 32,
        [dayjs().format("YYYY-MM-DD")]: 12,
      },
    },
    {
      id: 3,
      title: "Reading",
      icon: "mdi:book-open-page-variant",
      target: 15,
      increment: 2,
      value: 10,
      unit: "pages",
      history: {
        [dayjs().subtract(5, "day").format("YYYY-MM-DD")]: 19,
        [dayjs().subtract(4, "day").format("YYYY-MM-DD")]: 15,
        [dayjs().subtract(3, "day").format("YYYY-MM-DD")]: 18,
        [dayjs().subtract(2, "day").format("YYYY-MM-DD")]: 19,
        [dayjs().subtract(1, "day").format("YYYY-MM-DD")]: 16,
        [dayjs().format("YYYY-MM-DD")]: 12,
      },
    },
  ],
};
