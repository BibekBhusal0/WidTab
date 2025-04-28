import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Note from ".";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

function NoteWidget({ id }: controlledWidgetValues) {
  const dispatch = useDispatch();
  const { allNotes } = useSelector((state: StateType) => state.note);
  const deleteAction = () => dispatch(currentSpaceDeleteWidget({ id, type: "note" }));

  const task = allNotes.find((p) => p.id === id);
  if (!task) {
    deleteAction();
    return null;
  }
  return <Note {...task} />;
}

export default NoteWidget;
