import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cn } from "@/utils/cn";

export type AddItemProps = {
  word_limit?: number;
  clickEvent?: (text: string) => void;
  mainProps?: BoxProps;
  inputProps?: TextFieldProps;
  addButtonProps?: ButtonProps;
  backButtonProps?: ButtonProps;
  showBackButton?: boolean;
};

function AddItem({
  word_limit = undefined,
  clickEvent = () => {},
  mainProps = undefined,
  inputProps = undefined,
  addButtonProps = undefined,
  backButtonProps = undefined,
  showBackButton = true,
}: AddItemProps) {
  const [inp, setInp] = useState(false);
  const [text, setText] = useState("");
  const reached_word_limit =
    word_limit === undefined ? false : text.length >= word_limit;

  const handleClick = () => {
    const usefulText = text.trim();
    if (usefulText !== "" && !reached_word_limit) {
      clickEvent(usefulText);
      setInp(!inp);
      setText("");
    } else if (!inp) {
      setInp(!inp);
    }
  };
  return (
    <Box
      {...mainProps}
      className={cn(
        "flex gap-2 flex-col justify-center",
        mainProps?.className
      )}>
      {inp && (
        <TextField
          label="Name"
          variant="outlined"
          value={text}
          error={reached_word_limit}
          helperText={reached_word_limit && `${20} Character Max`}
          {...inputProps}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <div className="flex-center gap-4">
        <Button
          children="Add"
          variant={inp ? "contained" : "outlined"}
          startIcon={<AddIcon />}
          disabled={inp && (text.trim().length === 0 || reached_word_limit)}
          {...addButtonProps}
          onClick={handleClick}
        />
        {inp && showBackButton && (
          <Button
            onClick={() => setInp(false)}
            variant="outlined"
            color="error"
            startIcon={<ArrowBackIcon />}
            children="Back"
            {...backButtonProps}
          />
        )}
      </div>
    </Box>
  );
}

export default AddItem;
