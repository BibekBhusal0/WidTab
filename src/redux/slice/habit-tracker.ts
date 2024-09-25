import {
  HabitTrackerItemType,
  HabitTrackerSliceType,
} from "@/types/slice/habit-tracker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HabitTrackerSliceType = {
  trackers: [{ id: 1, increment: 10, target: 100, title: "breathe", value: 0 }],
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
      action: PayloadAction<{ id: number; action: "increment" | "decrement" }>
    ) => {
      const crr = state.trackers.find(({ id }) => id === action.payload.id);
      if (crr) {
        const valChange =
          action.payload.action === "increment"
            ? crr.increment
            : -crr.increment;
        crr.value += valChange;
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
  },
});

export const { addItem, changeValue, deleteItem, setItem } =
  habitTrackerSlice.actions;
export default habitTrackerSlice.reducer;
