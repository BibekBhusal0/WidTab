import MenuPopover from "@/components/popoverMenu";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import {
  addTodo,
  changePinnedTodo,
  deleteTask,
  toggleSortedFiltered,
} from "@/storage/todo";
import { currentSpaceDeleteWidget } from "@/storage/layout";
import IconButton from "@mui/material/IconButton";
import { useLayout, useTodo } from "@/storage";

export const TodoMenu: React.FC<{ id: number }> = ({ id }) => {
  const { pinnedTodo, Tasks } = useTodo();
  const crr = Tasks.find((t) => t.id === id);
  const { currentSpace } = useLayout();
  const { pin, delete_, sort, show, hide, add } = useCurrentIcons();

  if (!crr) return null;
  const { filtered, sorted } = crr;

  const pinned = pinnedTodo === id;
  const handleFilter = () => toggleSortedFiltered({ id, type: "filtered" });
  const handleSort = () => toggleSortedFiltered({ id, type: "sorted" });
  const handlePin = () => changePinnedTodo(id);
  const handleDelete = () => {
    if (currentSpace.type === "dynamic") {
      currentSpaceDeleteWidget({ id, type: "todo" });
    } else {
      deleteTask(id);
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
  const { add } = useCurrentIcons();
  const handleAdd = () => addTodo(id, "");

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
