// export type HabitTrackerHistoryType = {}

export type HabitTrackerItemType = {
  id: number;
  title: string;
  icon: string;
  target: number;
  increment: number;
  value: number;
  unit: string;
};

export type HabitTrackerSliceType = {
  trackers: HabitTrackerItemType[];
  pinned: number | null;
};
