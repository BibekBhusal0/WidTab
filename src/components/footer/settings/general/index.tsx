import { toggleDock } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import SelectToolBarPosition from "./toolBarPosition";
import SettingHeader from "../settings-header";
import ToggleIcons from "./toggle-icons";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { toggleLink } from "@/redux/slice/bookmark";
import DockSettings from "./dock";

function GeneralSettings() {
  const { dock } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();
  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => dispatch(toggleDock()),
      title: "Dock",
      checked: dock,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <MenuSwitch plain items={toggle} />
      <div className="full-between">
        <div className="text-xl">Tool Bar Position</div>
        <SelectToolBarPosition />
      </div>
      <SettingHeader>Toolbar Icons</SettingHeader>
      <ToggleIcons />
      <SettingHeader>Dock</SettingHeader>
      <DockSettings />
    </div>
  );
}

export default GeneralSettings;
