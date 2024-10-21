import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import Todo from "@/layout/widgets/todo";
import { changeCurrentSpace } from "@/redux/slice/layout";
import FooterPopover from "../footerPopover";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function TodoButton() {
  const dispatch = useDispatch();
  const { checklist } = useCurrentIcons();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  const pinned = Tasks.find((t) => t.id === pinnedTodo);

  return (
    <FooterPopover tooltip="To-dos" icon={checklist}>
      <div className="flex h-56 overflow-clip">
        {pinned && (
          <div className="w-56 border-r-2 hide-widget-controls border-divider">
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
