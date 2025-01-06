import Paper from "@mui/material/Paper";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import Note from "../widgets/note";
import { ScrollArea } from "@/components/scrollarea";
import Controls from "../widgets/controls";
import IconButton from "@mui/material/IconButton";
import IconMenu from "@/components/menuWithIcon";
import { useNote } from "@/storage";
import { addNoteWithTitle, deleteNote } from "@/storage/note";

function NotesPage() {
  const { add } = useCurrentIcons();
  const { allNotes } = useNote();
  const { delete_ } = useCurrentIcons();

  const commonCls = "h-80 overflow-hidden";

  return (
    <ScrollArea className="size-full">
      <div className="grid gap-3 grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3">
        {allNotes.map((p) => {
          const handleDelete = () => deleteNote(p.id);
          return (
            <Paper
              key={p.id}
              className={commonCls}
              sx={{ backgroundColor: "secondaryContainer.paper" }}>
              <Controls
                deleteButton={false}
                includePopover={false}
                controls={
                  <IconButton
                    color="error"
                    onClick={() => deleteNote(p.id)}
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
                <Note {...p} />
              </Controls>
            </Paper>
          );
        })}
        <Paper
          sx={{ backgroundColor: "secondaryContainer.paper" }}
          onClick={() => addNoteWithTitle("")}
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
