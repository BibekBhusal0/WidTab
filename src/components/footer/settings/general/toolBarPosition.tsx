import { ToolBarPositions } from "@/types/slice/layout";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLayout } from "@/storage";
import { changeToolBarPosition } from "@/storage/layout";

function SelectToolBarPosition() {
  const { toolBarPosition } = useLayout();
  const sides: ToolBarPositions[] = ["top", "left", "bottom", "right"];

  return (
    <Select
      className="w-full capitalize"
      value={toolBarPosition}
      size="small"
      onChange={(e) =>
        changeToolBarPosition(e.target.value as ToolBarPositions)
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
