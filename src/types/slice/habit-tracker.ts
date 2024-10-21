import { ButtonProps } from "@mui/material/Button";
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

export interface HabitTrackerEditProps {
  initialState?: HabitTrackerItemType;
  buttonProps?: Partial<ButtonProps>;
  onChange: (value: HabitTrackerItemType) => void;
}

export type HabitTrackerSliceType = {
  trackers: HabitTrackerItemType[];
  pinned: number | null;
};
