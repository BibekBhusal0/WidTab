import SelectToolBarPosition from "./toolBarPosition";
import SettingHeader from "../settings-header";
import ToggleIcons from "./toggle-icons";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import DockSettings from "./dock";
import { useBookmarkState } from "@/storage";
import { toggleLink } from "@/storage/bookmark";

function GeneralSettings() {
  const { linkInNewTab } = useBookmarkState();
  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => toggleLink(),
      title: "Open Link in New Tab",
      checked: linkInNewTab,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 pb-4">
      {/* Link in new tab */}
      <MenuSwitch plain items={toggle} />

      <div className="full-between">
        <div className="text-xl">Tool Bar Position</div>
        <SelectToolBarPosition />
      </div>
      <SettingHeader>Dock</SettingHeader>
      <DockSettings />
      <SettingHeader>Toolbar Icons</SettingHeader>
      <ToggleIcons />
    </div>
  );
}

export default GeneralSettings;
