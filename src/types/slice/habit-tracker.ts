// export type HabitTrackerHistoryType = {}

export type HabitTrackerItemType = {
  id: number;
  title: string;
  target: number;
  increment: number;
  value: number;

  //  history : HabitTrackerHistoryType
};

export type HabitTrackerSliceType = {
  trackers: HabitTrackerItemType[];
};
