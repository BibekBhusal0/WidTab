import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type RenameItemProps = {
  initialText: string;
  handleChange: (item: string) => any;
  realTime?: boolean;
  wordLimit?: number;
  inputProps?: OutlinedInputProps;
  children?: React.ReactNode;
};

function RenameItem({
  initialText,
  handleChange,
  inputProps,
  wordLimit,
  children,
  realTime = false,
}: RenameItemProps) {
  const [text, setText] = useState(initialText);
  const hitsWordLimit: boolean = wordLimit !== undefined && text.length >= wordLimit;
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
    <FormControl fullWidth>
      {children}

      <OutlinedInput
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick();
        }}
        endAdornment={
          !realTime && (
            <InputAdornment position="end">
              <IconButton
                disabled={hitsWordLimit || isEmpty}
                children={<Icon icon="material-symbols:done" />}
                onClick={handleClick}
              />
            </InputAdornment>
          )
        }
        size="small"
        error={hitsWordLimit}
        {...inputProps}
        sx={{ paddingRight: "0", ...inputProps?.sx }}
        value={text}
        onChange={handleInputChange}
      />

      <FormHelperText error>{hitsWordLimit ? "Word limit exceeded." : null}</FormHelperText>
    </FormControl>
  );
}

export default RenameItem;
