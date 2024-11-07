import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import Note from "../widgets/note";
import { addNoteWithTitle, deleteNote } from "@/redux/slice/note";
import { ScrollArea } from "@/components/scrollarea";
import Controls from "../widgets/controls";
import IconButton from "@mui/material/IconButton";

function NotesPage() {
  const { add } = useCurrentIcons();
  const { allNotes } = useSelector((state: StateType) => state.note);
  const { delete_ } = useCurrentIcons();

  const dispatch = useDispatch();
  const commonCls = "h-80 overflow-hidden";

  return (
    <ScrollArea className="size-full">
      <div className="grid gap-3 grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3">
        {allNotes.map((p) => (
          <Paper key={p.id} className={commonCls}>
            <Controls
              showOn="hover"
              deleteButton={false}
              controls={
                <IconButton
                  sx={{ color: "error.main" }}
                  onClick={() => {
                    dispatch(deleteNote(p.id));
                  }}>
                  {delete_}
                </IconButton>
              }>
              <Note {...p} />
            </Controls>
          </Paper>
        ))}
        <Paper
          onClick={() => dispatch(addNoteWithTitle(""))}
          className={cn(commonCls, "flex-center group cursor-pointer")}>
          <div className="group-hover:scale-[6] scale-[3] transition-all">
            {add}
          </div>
        </Paper>
      </div>
    </ScrollArea>
  );
}

export default NotesPage;
