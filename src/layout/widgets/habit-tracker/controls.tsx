import WidgetControls from "@/components/widgetControl";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import MenuPopover from "@/components/popoverMenu";

function HabitTrackerControls({
  handleReset,
  handlePin,
  handleDelete,
  pinned,
}: {
  handleReset: () => void;
  pinned?: boolean;
  handlePin: () => void;
  handleDelete: () => void;
}) {
  const { delete_, reset, pin } = useCurrentIcons();
  const items: IconMenuType[] = [
    {
      name: pinned ? "Unpin" : "Pin",
      icon: pin,
      onClick: handlePin,
      color: pinned ? "primary.main" : "action.main",
    },

    {
      name: "Delete",
      icon: delete_,
      onClick: handleDelete,
      color: "error.main",
    },
    { name: "Reset", icon: reset, onClick: handleReset },
  ];
  return (
    <WidgetControls>
      <MenuPopover>
        <IconMenu menuItems={items} />
      </MenuPopover>
    </WidgetControls>
  );
}

export default HabitTrackerControls;
