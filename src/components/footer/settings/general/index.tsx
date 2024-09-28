import { changeControlBarPosition, toggleLink } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { ControlBarPositions } from "@/types/slice/layout";
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
        <div className="text-xl">Control Bar Position</div>
        <SelectControlBarPosition />
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

function SelectControlBarPosition() {
  const { controlBarPosition } = useSelector(
    (state: StateType) => state.layout
  );
  const dispatch = useDispatch();
  const sides: ControlBarPositions[] = ["top", "left", "bottom", "right"];

  return (
    <Select
      className="w-full capitalize"
      value={controlBarPosition}
      onChange={(e) =>
        dispatch(
          changeControlBarPosition(e.target.value as ControlBarPositions)
        )
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
