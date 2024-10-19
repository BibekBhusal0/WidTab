import { todoMenuProps } from "@/types/slice/todo";
import MenuPopover from "@/components/popoverMenu";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";

function TodoMenu({
  handleDelete,
  handleSort,
  handleFilter,
  handlePin,
  pinned,
  sorted,
  filtered,
}: todoMenuProps) {
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
    <div>
      <MenuPopover>
        <IconMenu menuItems={items} />
      </MenuPopover>
    </div>
  );
}

export default TodoMenu;
