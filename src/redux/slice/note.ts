import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialNoteState } from "./initialStates";
import { noteType } from "@/types/slice/notes";
import { getNextId } from "@/utils/next_id";

export const noteSlice = createSlice({
  initialState: initialNoteState,
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
  },
});

export const { addNote, addNoteWithTitle, changeNoteContent } =
  noteSlice.actions;
export default noteSlice.reducer;
