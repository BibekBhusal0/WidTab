import useCurrentIcons from "@/hooks/useCurrentIcons";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import { changePinnedTodo, deleteTask, toggleFiltered } from "@/redux/slice/todo";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

export const TodoControls: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const { pinnedTodo, Tasks } = useSelector((state: StateType) => state.todo);
  const crr = Tasks.find((t) => t.id === id);
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const { pin, delete_, show, hide } = useCurrentIcons();

  if (!crr) return null;
  const { filtered } = crr;

  const pinned = pinnedTodo === id;
  const handleFilter = () => dispatch(toggleFiltered({ id }));
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

export default TodoControls;
