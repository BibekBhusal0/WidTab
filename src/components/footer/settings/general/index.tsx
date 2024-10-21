import { toggleLink } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import SelectToolBarPosition from "./toolBarPosition";
import SettingHeader from "../settings-header";
import ToggleIcons from "./toggle-icons";

function GeneralSettings() {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="full-between">
        <div className="text-xl">Open Link in New Tab</div>
        <ToggleLinkInNT />
      </div>
      <div className="full-between">
        <div className="text-xl">Tool Bar Position</div>
        <SelectToolBarPosition />
      </div>
      <SettingHeader className="pb-0 ">Toolbar Icons</SettingHeader>
      <ToggleIcons />
    </div>
  );
}

function ToggleLinkInNT() {
  const { linkInNewTab } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();

  return (
    <Switch checked={linkInNewTab} onChange={() => dispatch(toggleLink())} />
  );
}

export default GeneralSettings;
