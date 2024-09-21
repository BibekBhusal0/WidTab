// export type HabitTrackerHistoryType = {}

export type HabitTrackerItemType = {
  id: string;
  title: string;
  target: number;
  increment: number;
  //  history : HabitTrackerHistoryType
};

export type HabitTrackerSliceType = {
  Trackers: HabitTrackerItemType[];
};
