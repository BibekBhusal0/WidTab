import MenuPopover from "@/components/popoverMenu";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import {
  addTodo,
  changePinnedTodo,
  deleteTask,
  toggleSortedFiltered,
} from "@/redux/slice/todo";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import IconButton from "@mui/material/IconButton";

export const TodoMenu: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const { pinnedTodo, Tasks } = useSelector((state: StateType) => state.todo);
  const crr = Tasks.find((t) => t.id === id);
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const { pin, delete_, sort, show, hide } = useCurrentIcons();

  if (!crr) return null;
  const { filtered, sorted } = crr;

  const pinned = pinnedTodo === id;
  const handleFilter = () =>
    dispatch(toggleSortedFiltered({ id, type: "filtered" }));
  const handleSort = () =>
    dispatch(toggleSortedFiltered({ id, type: "sorted" }));
  const handlePin = () => dispatch(changePinnedTodo(id));
  const handleDelete = () => {
    if (currentSpace.type === "dynamic") {
      dispatch(currentSpaceDeleteWidget({ id, type: "todo" }));
    } else {
      dispatch(deleteTask(id));
    }
  };

  const items: IconMenuType[] = [
    {
      name: pinned ? "Unpin" : "Pin",
      icon: pin,
      onClick: handlePin,
      color: pinned ? "primary.main" : "action.main",
    },
    {
      name: "Sort",
      icon: sort,
      onClick: handleSort,
      color: sorted ? "primary.main" : "action.main",
    },
    {
      name: `${filtered ? "Show" : "Hide"} Done`,
      icon: filtered ? show : hide,
      onClick: handleFilter,
      color: "action.main",
    },
    {
      name: "Delete",
      icon: delete_,
      onClick: handleDelete,
      color: "error.main",
    },
  ];

  return <IconMenu menuItems={items} />;
};

function TodoControls({ id }: { id: number }) {
  const dispatch = useDispatch();
  const { add } = useCurrentIcons();
  const handleAdd = () => {
    dispatch(addTodo({ task_id: id, task: "" }));
  };

  return (
    <>
      <IconButton onClick={handleAdd}>{add}</IconButton>
      <MenuPopover>
        <TodoMenu id={id} />
      </MenuPopover>
    </>
  );
}

export default TodoControls;
