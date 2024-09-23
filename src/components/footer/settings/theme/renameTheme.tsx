import useCurrentTheme from "@/hooks/useCurrentTheme";
import { changeTheme } from "@/redux/slice/theme";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useDispatch } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

function RenameTheme() {
  const theme = useCurrentTheme();
  const dispatch = useDispatch();
  const [text, setText] = useState(theme.name);
  const wordLimit = 20;
  const hitsWordLimit = text.length >= wordLimit;
  const trimmedText = text.trim();
  const isEmpty = trimmedText.length === 0;

  const handleClick = () => {
    if (!hitsWordLimit && !isEmpty && trimmedText !== theme.name) {
      dispatch(
        changeTheme({
          ...theme,
          name: trimmedText,
        })
      );
    }
  };
  return (
    <div className="between w-full gap-4">
      <div className="text-xl">Theme Name</div>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          id="Theme_Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="small"
          error={hitsWordLimit || isEmpty}
          placeholder="Theme Name"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={hitsWordLimit || isEmpty}
                onClick={handleClick}>
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error>
          {hitsWordLimit
            ? "Word limit exceeded."
            : isEmpty
              ? "Theme name cannot be empty."
              : null}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default RenameTheme;
