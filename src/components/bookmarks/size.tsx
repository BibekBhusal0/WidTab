import Box, { BoxProps } from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useId } from "react";
import { allFolderSizes } from "@/types/slice/bookmark";

export default function SelectSize({
  boxProps,
  ...props
}: { boxProps?: BoxProps } & SelectProps) {
  const id = useId();

  return (
    <Box {...boxProps} sx={{ minWidth: 120, ...boxProps?.sx }}>
      <FormControl fullWidth>
        <InputLabel id={id}>Size</InputLabel>
        <Select labelId={id} label="Size" {...props}>
          {allFolderSizes.map((s) => (
            <MenuItem className="capitalize" key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
