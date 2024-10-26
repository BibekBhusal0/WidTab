import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { toggleIcon } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { allRemovableToolbarIcons } from "@/types/slice/layout";
import { useDispatch, useSelector } from "react-redux";

function ToggleIcons() {
  const { toolBarIcons } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();
  const items: MenuSwitchProps["items"] = allRemovableToolbarIcons.map((i) => {
    return {
      title: i,
      onChange: () => dispatch(toggleIcon(i)),
      checked: toolBarIcons.includes(i),
    };
  });

  return (
    <div className="flex-center flex-col gap-4 px-4">
      <MenuSwitch plain items={items} />
    </div>
  );
}

export default ToggleIcons;
