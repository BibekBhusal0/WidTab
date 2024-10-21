import MenuPopover from "@/components/popoverMenu";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import { TaskType } from "@/types/slice/todo";
import {
  changePinnedTodo,
  deleteTask,
  toggleSortedFiltered,
} from "@/redux/slice/todo";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

function TodoMenu({ id, sorted, filtered }: TaskType) {
  const dispatch = useDispatch();
  const { pinnedTodo } = useSelector((state: StateType) => state.todo);
  const { currentSpace } = useSelector((state: StateType) => state.layout);

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

  const { pin, delete_, sort, show, hide } = useCurrentIcons();
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

  return (
    <MenuPopover>
      <IconMenu menuItems={items} />
    </MenuPopover>
  );
}

export default TodoMenu;
