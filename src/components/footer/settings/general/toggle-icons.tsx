import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { useLayout } from "@/storage";
import { toggleIcon } from "@/storage/layout";
import { allRemovableToolbarIcons } from "@/types/slice/layout";

function ToggleIcons() {
  const { toolBarIcons } = useLayout();
  const items: MenuSwitchProps["items"] = allRemovableToolbarIcons.map((i) => {
    return {
      title: i,
      onChange: () => toggleIcon(i),
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
