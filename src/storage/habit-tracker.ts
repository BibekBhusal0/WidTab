import { getFromStorage, setInStorage, STORAGE_KEYS } from "./";
import { getNextId } from "@/utils/next_id";
import { initialHabitTrackerState } from "./initialStates";
import dayjs from "@/dayjsConfig";
import {
  HabitTrackerItemType,
  habitTrackerStateType,
} from "@/types/slice/habit-tracker";

const HABIT_TRACKER_STORAGE_KEY = STORAGE_KEYS.habitTracker;
export const getHabitTrackerState = async () => {
  return (
    ((await getFromStorage(
      HABIT_TRACKER_STORAGE_KEY
    )) as habitTrackerStateType) || { allNotes: [] }
  );
};

export async function getTracker(id: number) {
  const state = await getHabitTrackerState();
  return state.trackers.find((p) => p.id === id);
}
export async function fixState(state: habitTrackerStateType) {
  const newState: habitTrackerStateType = { ...state };
  const val = state;
  if (!val) return;
  if (val.timerHistory) newState.timerHistory = val.timerHistory;
  if (!val.trackers) return;
  if (!Array.isArray(val.trackers)) return;

  const trackers = [...newState.trackers];
  val.trackers.forEach((tracker) => {
    const crr = trackers.find(
      ({ title, id }) => title === tracker.title && id === tracker.id
    );
    if (crr) Object.assign(crr, tracker);
    else {
      const id = getNextId(trackers.map(({ id }) => id));
      if (tracker.id === val.pinned) newState.pinned = id;
      trackers.push({ ...tracker, id });
    }
  });
  newState.trackers = trackers;
  return newState;
}
export async function addTracker(tracker: HabitTrackerItemType) {
  const state = await getHabitTrackerState();
  setInStorage(HABIT_TRACKER_STORAGE_KEY, {
    ...state,
    trackers: [
      ...state.trackers,
      { tracker, id: getNextId(state.trackers.map(({ id }) => id)) },
    ],
  });
}
export async function deleteTracker(id: number) {
  const state = await getHabitTrackerState();
  setInStorage(HABIT_TRACKER_STORAGE_KEY, {
    ...state,
    trackers: state.trackers.filter((p) => p.id !== id),
  });
}
export async function changeValue(
  id: number,
  action: "increment" | "decrement" | "reset"
) {
  const state = await getHabitTrackerState();
  const crr = await getTracker(id);
  const a = action;
  if (!crr) return;
  if (!crr.history) crr.history = {};
  let value = crr.history[dayjs().format("YYYY-MM-DD")] || 0;
  if (a === "reset") value = 0;
  else if (a === "increment") value += crr.increment;
  else value = Math.max(value - crr.increment, 0);
  const today = dayjs().format("YYYY-MM-DD");
  crr.history[today] = value;
  setInStorage(HABIT_TRACKER_STORAGE_KEY, {
    ...state,
    trackers: [...state.trackers],
  });
}
export async function setTrackerItem(tracker: HabitTrackerItemType) {
  const state = await getHabitTrackerState();
  const crr = await getTracker(tracker.id);
  if (!crr) return;
  Object.assign(crr, tracker);
  setInStorage(HABIT_TRACKER_STORAGE_KEY, { ...state });
}
export async function changePinnedHabitTracker(id: number) {
  const state = await getHabitTrackerState();
  setInStorage(HABIT_TRACKER_STORAGE_KEY, {
    ...state,
    pinned: state.pinned === id ? null : id,
  });
}
export async function updateTimerHistory(time: number) {
  const state = await getHabitTrackerState();
  const today = dayjs().format("YYYY-MM-DD");
  const hist = state.timerHistory || {};
  setInStorage(HABIT_TRACKER_STORAGE_KEY, {
    ...state,
    timerHistory: { ...hist, [today]: (hist[today] || 0) + time },
  });
}
export function setTrackerState(state: habitTrackerStateType) {
  const newState = fixState(state);
  if (newState) setInStorage(HABIT_TRACKER_STORAGE_KEY, newState);
}
export function resetHabitTrackerState() {
  setInStorage(HABIT_TRACKER_STORAGE_KEY, initialHabitTrackerState);
}
