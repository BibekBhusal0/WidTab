import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { ChangeEvent, useEffect, useState } from "react";

type RenameItemProps = {
  initialText: string;
  handleChange: (item: string) => void;
  realTime?: boolean;
  wordLimit?: number;
  inputProps?: OutlinedInputProps;
};

function RenameItem({
  initialText,
  handleChange,
  inputProps = undefined,
  realTime = false,
  wordLimit = undefined,
}: RenameItemProps) {
  const [text, setText] = useState(initialText);
  const hitsWordLimit: boolean =
    wordLimit !== undefined && text.length >= wordLimit;
  const trimmedText = text.trim();
  const isEmpty = trimmedText.length === 0;

  useEffect(() => {
    setText(initialText);
  }, [initialText]);
  const handleClick = () => {
    if (!hitsWordLimit && !isEmpty && trimmedText !== initialText) {
      handleChange(trimmedText);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (realTime) {
      handleChange(e.target.value);
    } else {
      setText(e.target.value);
    }
  };
  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        endAdornment={
          !realTime && (
            <InputAdornment position="end">
              <IconButton
                disabled={hitsWordLimit || isEmpty}
                children={<DoneIcon />}
                onClick={handleClick}
              />
            </InputAdornment>
          )
        }
        size="small"
        error={hitsWordLimit}
        {...inputProps}
        value={text}
        onChange={handleInputChange}
      />
      <FormHelperText error>
        {hitsWordLimit ? "Word limit exceeded." : null}
      </FormHelperText>
    </FormControl>
  );
}

export default RenameItem;
