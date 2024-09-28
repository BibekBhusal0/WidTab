import { changeToolBarPosition, toggleLink } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { ToolBarPositions } from "@/types/slice/layout";
import { MenuItem, Select, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function GeneralSettings() {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="between gap-4">
        <div className="text-xl">Open Link in New Tab</div>
        <ToggleLinkInNT />
      </div>
      <div className="between gap-4">
        <div className="text-xl">Tool Bar Position</div>
        <SelectToolBarPosition />
      </div>
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

function SelectToolBarPosition() {
  const { toolBarPosition } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();
  const sides: ToolBarPositions[] = ["top", "left", "bottom", "right"];

  return (
    <Select
      className="w-full capitalize"
      value={toolBarPosition}
      onChange={(e) =>
        dispatch(changeToolBarPosition(e.target.value as ToolBarPositions))
      }>
      {sides.map((c) => (
        <MenuItem className="capitalize" key={c} value={c}>
          {c}
        </MenuItem>
      ))}
    </Select>
  );
}

export default GeneralSettings;
