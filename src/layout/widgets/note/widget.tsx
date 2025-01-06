import { useNote } from "@/storage";
import Note from ".";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { currentSpaceDeleteWidget } from "@/storage/layout";

function NoteWidget({ id }: controlledWidgetValues) {
  const { allNotes } = useNote();
  const deleteAction = () => currentSpaceDeleteWidget({ id, type: "note" });

  const task = allNotes.find((p) => p.id === id);
  if (!task) {
    deleteAction();
    return null;
  }
  return <Note {...task} />;
}

export default NoteWidget;
