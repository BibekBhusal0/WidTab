// export type HabitTrackerHistoryType = {}

export type HabitTrackerItemType = {
  id: number;
  title: string;
  target: number;
  increment: number;
  value: number;
  streak: number;
  completedToday: boolean;
  tag?: string;
};

export type HabitTrackerSliceType = {
  trackers: HabitTrackerItemType[];
  pinned: number | null;
};
