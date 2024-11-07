import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialNoteState } from "./initialStates";
import { noteStateType, noteType } from "@/types/slice/notes";
import { getNextId } from "@/utils/next_id";

export const noteSlice = createSlice({
  initialState: { ...initialNoteState },
  name: "note",
  reducers: {
    addNote: (state, action: PayloadAction<noteType>) => {
      const id = getNextId(state.allNotes.map(({ id }) => id));
      state.allNotes.push({ ...action.payload, id });
    },
    addNoteWithTitle: (state, action: PayloadAction<string>) => {
      const id = getNextId(state.allNotes.map(({ id }) => id));
      state.allNotes.push({ title: action.payload, id, text: "", icon: "" });
    },
    changeNoteContent: (
      state,
      action: PayloadAction<{
        id: number;
        content: "icon" | "text" | "title";
        value: string;
      }>
    ) => {
      const note = state.allNotes.find((p) => p.id === action.payload.id);
      if (note) {
        note[action.payload.content] = action.payload.value;
      }
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.allNotes = state.allNotes.filter((p) => p.id !== action.payload);
    },
    resetNoteState: (state) => {
      state = { ...initialNoteState };
    },
    setState: (state, action: PayloadAction<noteStateType>) => {
      const val = action.payload;
      if (!val) return;
      if (!val.allNotes) return;
      const { allNotes } = val;
      if (!Array.isArray(allNotes)) return;
      const notes = [...state.allNotes];
      allNotes.forEach((note) => {
        notes.push({ ...note, id: getNextId(notes.map(({ id }) => id)) });
      });

      state.allNotes = notes;
    },
  },
});

export const {
  addNote,
  addNoteWithTitle,
  changeNoteContent,
  deleteNote,
  resetNoteState,
} = noteSlice.actions;
export default noteSlice.reducer;
