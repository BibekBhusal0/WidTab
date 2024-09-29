import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { Box, Button, Slider, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import HelpInCustomWidget from "./helpCustom";

export const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/;

function AddCustomWidget() {
  const dispatch = useDispatch();
  const { n_cols } = useSelector((state: StateType) => state.layout);
  const [text, setText] = useState("");
  const [extractedUrl, setExtractedUrl] = useState("");
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const available_widgets = useAvailablePosition(cols, rows);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);

    const matchedUrl = inputValue.match(urlPattern);
    setExtractedUrl(matchedUrl ? matchedUrl[0] : "");
  };
  const add = () => {
    if (available_widgets !== null && extractedUrl !== "") {
      dispatch(
        currentSpaceAddWidget({
          gridProps: available_widgets,
          type: "custom",
          values: { id: 0, url: extractedUrl },
        })
      );
      setText("");
      setExtractedUrl("");
    }
  };
  return (
    <Box className="size-full relative flex flex-col gap-3">
      <TextField
        error={extractedUrl === "" && text.trim() !== ""}
        helperText={
          extractedUrl === "" && text.trim() !== "" && "Enter valid URL"
        }
        autoFocus
        onChange={handleTextChange}
        value={text}
        label="Widget URL"
      />
      <div className="flex items-center px-3 gap-2 flex-col">
        <Box className="flex justify-start gap-5 w-full">
          <Box className="text-xl">X:</Box>
          <Slider
            value={cols}
            onChange={(_, value) => setCols(value as number)}
            min={1}
            max={n_cols}
          />
        </Box>
        <Box className="flex justify-start gap-5 w-full">
          <Box className="text-xl">Y:</Box>
          <Slider
            value={rows}
            onChange={(_, value) => setRows(value as number)}
            min={1}
            max={n_cols}
          />
        </Box>
      </div>

      <Button
        disabled={extractedUrl === "" || available_widgets === null}
        onClick={add}
        variant="contained"
        className="mx-5"
        startIcon={<AddIcon />}

        //
      >
        Add
      </Button>
      <HelpInCustomWidget />
    </Box>
  );
}

export default AddCustomWidget;
