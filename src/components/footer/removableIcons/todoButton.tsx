import Button from "@mui/material/Button";
import Todo from "@/layout/widgets/todo";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import FooterPopover from "@/components/footerPopover";
import { useTodo } from "@/storage";
import { changeCurrentSpace } from "@/storage/layout";

function TodoButton() {
  const { checklist } = useCurrentIcons();
  const { Tasks, pinnedTodo } = useTodo();
  const pinned = Tasks.find((t) => t.id === pinnedTodo);

  return (
    <FooterPopover tooltip="To-dos" icon={checklist}>
      <div className="flex h-80 overflow-clip">
        {pinned && (
          <div className="w-96 border-r-2 border-divider">
            <Todo {...pinned} />
          </div>
        )}
        <div className="flex-center flex-col px-3">
          <Button
            variant="contained"
            onClick={() => changeCurrentSpace({ type: "static", id: "todo" })}>
            All To-dos
          </Button>
        </div>
      </div>
    </FooterPopover>
  );
}

export default TodoButton;
