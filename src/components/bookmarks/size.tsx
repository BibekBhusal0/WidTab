import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { allFolderSizes } from "@/types/slice/bookmark";
import { cn } from "@/utils/cn";

export default function SelectSize({ ...props }: TextFieldProps) {
  return (
    <TextField select label="Size" className={cn("capitalize", props.className)} {...props}>
      {allFolderSizes.map((s) => (
        <MenuItem className="capitalize" key={s} value={s} children={s} />
      ))}
    </TextField>
  );
}
