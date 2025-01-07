import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import Todo from "@/layout/widgets/todo";
import { changeCurrentSpace } from "@/redux/slice/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import FooterPopover from "@/components/footerPopover";

function TodoButton() {
  const dispatch = useDispatch();
  const { checklist } = useCurrentIcons();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
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
            onClick={() =>
              dispatch(changeCurrentSpace({ type: "static", id: "todo" }))
            }>
            All To-dos
          </Button>
        </div>
      </div>
    </FooterPopover>
  );
}

export default TodoButton;
