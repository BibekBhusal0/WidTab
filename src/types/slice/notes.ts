export interface noteType {
  id: number;
  icon: string;
  title: string;
  text: string;
}

export interface noteStateType {
  allNotes: noteType[];
}
