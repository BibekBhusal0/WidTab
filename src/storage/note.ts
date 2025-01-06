import { initialNoteState } from "./initialStates";
import { noteStateType, noteType } from "@/types/slice/notes";
import { getFromStorage, setInStorage, STORAGE_KEYS } from "./";
import { getNextId } from "@/utils/next_id";

const NOTE_STORAGE_KEY = STORAGE_KEYS.note;
export const getNoteState = async () => {
  return (
    ((await getFromStorage(NOTE_STORAGE_KEY)) as noteStateType) || {
      allNotes: [],
    }
  );
};

export async function fixState(state: noteStateType) {
  const val = state;
  if (!val || !val.allNotes) return false;
  const { allNotes } = val;
  if (!Array.isArray(allNotes)) return false;
  const _state = [...state.allNotes];

  allNotes.forEach((note) => {
    const crr = _state.find(({ id }) => id === note.id);
    if (crr && crr.title === note.title) Object.assign(crr, note);
    else _state.push({ ...note, id: getNextId(_state.map(({ id }) => id)) });
  });
  return { allNotes: _state };
}
export async function addNote(note: noteType) {
  const state = await getNoteState();
  const id = getNextId(state.allNotes.map(({ id }) => id));
  setInStorage(NOTE_STORAGE_KEY, {
    ...state,
    allNotes: [...state.allNotes, { ...note, id }],
  });
}

export async function deleteNote(id: number) {
  const state = await getNoteState();
  setInStorage(NOTE_STORAGE_KEY, {
    ...state,
    allNotes: state.allNotes.filter((p) => p.id !== id),
  });
}
export async function changeNoteContent({
  id,
  content,
  value,
}: {
  id: number;
  content: "icon" | "text" | "title";
  value: string;
}) {
  const state = await getNoteState();
  const note = state.allNotes.find((p) => p.id === id);
  if (note) {
    note[content] = value;
    setInStorage(NOTE_STORAGE_KEY, {
      ...state,
      allNotes: [...state.allNotes],
    });
  }
}

export async function addNoteWithTitle(title: string) {
  const state = await getNoteState();
  const id = getNextId(state.allNotes.map(({ id }) => id));
  setInStorage(NOTE_STORAGE_KEY, {
    ...state,
    allNotes: [
      ...state.allNotes,
      { title, id, text: "", icon: "mage:note-text" },
    ],
  });
}

export async function resetNoteState() {
  setInStorage(NOTE_STORAGE_KEY, initialNoteState);
}
export async function setNoteState(state: noteStateType) {
  const newState = fixState(state);
  if (newState) setInStorage(NOTE_STORAGE_KEY, newState);
}
