import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import Paper from "@mui/material/Paper";
import { cn } from "@/utils/cn";
import Note from "../widgets/note";
import { addNoteWithTitle, deleteNote, reorderNotes } from "@/redux/slice/note";
import { ScrollArea } from "@/components/scrollarea";
import Controls from "../widgets/controls";
import IconButton from "@mui/material/IconButton";
import IconMenu from "@/components/menuWithIcon";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/sortable";

function NotesPage() {
  const { add } = useCurrentIcons();
  const { allNotes } = useSelector((state: StateType) => state.note);
  const { delete_ } = useCurrentIcons();

  const dispatch = useDispatch();
  const commonCls = "h-80 overflow-hidden";

  return (
    <ScrollArea className="size-full">
      <Sortable
        value={allNotes}
        onValueChange={(n) => dispatch(reorderNotes(n))}
        orientation="mixed">
        <div className="grid gap-3 grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3">
          {allNotes.map((p) => {
            const handleDelete = () => dispatch(deleteNote(p.id));
            return (
              <SortableItem key={p.id} value={p.id}>
                <Paper
                  className={commonCls}
                  sx={{ backgroundColor: "secondaryContainer.paper" }}>
                  <Controls
                    className="pt-1"
                    deleteButton={false}
                    includePopover={false}
                    controls={
                      <IconButton
                        color="error"
                        onClick={() => dispatch(deleteNote(p.id))}
                        children={delete_}
                      />
                    }
                    showOn="always"
                    contextMenu={
                      <IconMenu
                        menuItems={[
                          {
                            name: "Delete",
                            icon: delete_,
                            color: "error.main",
                            onClick: handleDelete,
                          },
                        ]}
                      />
                    }>
                    <SortableDragHandle className="absolute w-full h-2 bg-primary-2 top-0 z-10" />

                    <Note {...p} />
                  </Controls>
                </Paper>
              </SortableItem>
            );
          })}
          <Paper
            sx={{ backgroundColor: "secondaryContainer.paper" }}
            onClick={() => dispatch(addNoteWithTitle(""))}
            className={cn(commonCls, "flex-center group cursor-pointer")}>
            <div className="group-hover:scale-[6] scale-[3] transition-all">
              {add}
            </div>
          </Paper>
        </div>
      </Sortable>
    </ScrollArea>
  );
}

export default NotesPage;
