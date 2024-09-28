import { changeToolBarPosition } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { ToolBarPositions } from "@/types/slice/layout";
import { MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

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

export default SelectToolBarPosition;
