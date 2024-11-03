import { HabitTrackerItemType } from "@/types/slice/habit-tracker";
import { getNextId } from "@/utils/next_id";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialHabitTrackerState } from "./initialStates";
import dayjs from "@/dayjsConfig";

const habitTrackerSlice = createSlice({
  name: "habit-tracker",
  initialState: initialHabitTrackerState,
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
      const a = action.payload.action;
      if (crr) {
        if (!crr.history) crr.history = {};
        let value = crr.history[dayjs().format("YYYY-MM-DD")] || 0;
        if (a === "reset") value = 0;
        else if (a === "increment") value += crr.increment;
        else value = Math.max(value - crr.increment, 0);

        const today = dayjs().format("YYYY-MM-DD");
        crr.history[today] = value;
      }
    },
    setItem: (state, action: PayloadAction<HabitTrackerItemType>) => {
      let crr = state.trackers.find(({ id }) => id === action.payload.id);
      if (crr) Object.assign(crr, action.payload);
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
