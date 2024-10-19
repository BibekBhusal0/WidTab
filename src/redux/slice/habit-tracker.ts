import {
  HabitTrackerItemType,
  HabitTrackerSliceType,
} from "@/types/slice/habit-tracker";
import { getNextId } from "@/utils/next_id";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HabitTrackerSliceType = {
  pinned: null,
  trackers: [
    {
      id: 1,
      increment: 10,
      target: 100,
      title: "breathe",
      value: 0,
      icon: "💧",
      unit: "times",
    },
  ],
};
const habitTrackerSlice = createSlice({
  name: "habit-tracker",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<HabitTrackerItemType>) => {
      state.trackers.push({
        ...action.payload,
        id: getNextId(state.trackers.map(({ id }) => id)),
      });
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.trackers = state.trackers.filter(({ id }) => id !== action.payload);
    },
    changeValue: (
      state,
      action: PayloadAction<{
        id: number;
        action: "increment" | "decrement" | "reset";
      }>
    ) => {
      const crr = state.trackers.find(({ id }) => id === action.payload.id);
      if (crr) {
        if (action.payload.action === "reset") {
          crr.value = 0;
        } else {
          const valChange =
            action.payload.action === "increment"
              ? crr.increment
              : -crr.increment;
          const newValue = crr.value + valChange;
          if (newValue >= 0) crr.value = newValue;
          else crr.value = 0;
        }
      }
    },
    setItem: (state, action: PayloadAction<HabitTrackerItemType>) => {
      const crr = state.trackers.find(({ id }) => id === action.payload.id);
      if (crr) {
        crr.increment = action.payload.increment;
        crr.target = action.payload.target;
        crr.title = action.payload.title;
        crr.value = action.payload.value;
      }
    },
    changePinnedHabitTracker: (state, action: PayloadAction<number>) => {
      if (state.pinned === action.payload) state.pinned = null;
      else state.pinned = action.payload;
    },
  },
});

export const {
  addItem,
  changeValue,
  deleteItem,
  setItem,
  changePinnedHabitTracker,
} = habitTrackerSlice.actions;
export default habitTrackerSlice.reducer;
