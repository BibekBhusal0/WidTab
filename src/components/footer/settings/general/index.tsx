import { toggleDock } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import SelectToolBarPosition from "./toolBarPosition";
import SettingHeader from "../settings-header";
import ToggleIcons from "./toggle-icons";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { toggleLink } from "@/redux/slice/bookmark";

function GeneralSettings() {
  const {
    layout: { dock },
    bookmarks: { linkInNewTab },
  } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => dispatch(toggleLink()),
      title: "Open Link in New Tab",
      checked: linkInNewTab,
    },
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
      <SettingHeader className="pb-0 ">Toolbar Icons</SettingHeader>
      <ToggleIcons />
    </div>
  );
}

export default GeneralSettings;
