import AddItem from "@/components/addItem";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { widgetDimensions } from "@/utils/getWidget";
import { getNextId } from "@/utils/next_id";
import { useDispatch, useSelector } from "react-redux";
import AllItemsList from "./allItemsList";
import { addNoteWithTitle } from "@/redux/slice/note";

function AddNote() {
  const dispatch = useDispatch();
  const { allNotes } = useSelector((state: StateType) => state.note);
  const layout = useCurrentLayout();
  const noteDimensions = widgetDimensions["note"];
  const { minH, minW } = noteDimensions;
  const availablePosition = useAvailablePosition(minW, minH);
  if (!layout) return null;
  const { widgets } = layout;
  const presentNote = widgets.filter(({ type }) => type === "note");
  const presentNoteId = presentNote.map(({ values: { id } }) => id);

  const addWidget = (id: number) => {
    if (!availablePosition || presentNoteId.includes(id)) return;
    dispatch(
      currentSpaceAddWidget({
        type: "note",
        values: { id },
        gridProps: {
          ...noteDimensions,
          ...availablePosition,
          i: `note-${id}`,
        },
      })
    );
  };

  const addNote = (title: string) => {
    if (!availablePosition) return;
    const newId = getNextId(allNotes.map(({ id }) => id));
    dispatch(addNoteWithTitle(title));
    addWidget(newId);
  };

  return (
    <div className="text-xl size-full">
      <AllItemsList
        addWidget={addWidget}
        items={allNotes}
        availablePosition={!!availablePosition}
        disabledId={presentNoteId}
      />

      <AddItem
        inputProps={{ label: "Note title", placeholder: "Note title" }}
        addButtonProps={{
          children: "Add New Note",
          disabled: !availablePosition,
        }}
        clickEvent={addNote}
        word_limit={undefined}
      />
      {!availablePosition && (
        <div className="text-lg text-error-main pt-3">Not Enough Space For Note</div>
      )}
    </div>
  );
}

export default AddNote;
