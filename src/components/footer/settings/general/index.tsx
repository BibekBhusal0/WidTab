import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import SelectToolBarPosition from "./toolBarPosition";
import SettingHeader from "../settings-header";
import ToggleIcons from "./toggle-icons";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { toggleLink } from "@/redux/slice/bookmark";
import DockSettings from "./dock";

function GeneralSettings() {
  const { linkInNewTab } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();
  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => dispatch(toggleLink()),
      title: "Open Link in New Tab",
      checked: linkInNewTab,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4 pb-4">
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
