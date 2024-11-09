import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useId } from "react";
import { AImodels } from "@/types/slice/widgets";

export default function SelectModel({ ...props }: SelectProps) {
  const id = useId();

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>Model</InputLabel>
      <Select labelId={id} label="Model" {...props}>
        {AImodels.map((s) => (
          <MenuItem className="capitalize" key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
