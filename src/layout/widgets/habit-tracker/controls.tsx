import WidgetControls from "@/components/widgetControl";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import MenuPopover from "@/components/popoverMenu";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import {
  changePinnedHabitTracker,
  changeValue,
  deleteItem,
} from "@/redux/slice/habit-tracker";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

function HabitTrackerControls({ id }: { id: number }) {
  const { delete_, reset, pin } = useCurrentIcons();

  const dispatch = useDispatch();
  const { pinned } = useSelector((state: StateType) => state["habit-tracker"]);
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const handlePin = () => {
    dispatch(changePinnedHabitTracker(id));
  };
  const handleDelete = () => {
    if (currentSpace.type === "dynamic") {
      dispatch(currentSpaceDeleteWidget({ id, type: "habit-tracker" }));
    } else {
      dispatch(deleteItem(id));
    }
  };
  const handleReset = () => {
    dispatch(changeValue({ id, action: "reset" }));
  };
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
