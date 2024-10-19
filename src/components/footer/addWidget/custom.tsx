import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import HelpInCustomWidget from "./helpCustom";
import { useState } from "react";

export const urlPattern = /(https?:\/\/[^\s"'"]+|www\.[^\s"'"]+)/;

function AddCustomWidget() {
  const dispatch = useDispatch();
  const { n_cols, n_rows } = useSelector((state: StateType) => state.layout);
  const [text, setText] = useState("");
  const [extractedUrl, setExtractedUrl] = useState("");
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
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
            max={n_rows}
          />
        </Box>
        <Box className="text-xl">
          Position: ({cols}, {rows})
        </Box>
        <Box sx={{ color: "error.main" }}>
          {" "}
          {available_widgets === null ? "No space available" : ""}{" "}
        </Box>
      </div>

      <Button
        disabled={extractedUrl === "" || available_widgets === null}
        onClick={add}
        variant="contained"
        className="mx-5"
        startIcon={<Icon icon="material-symbols:add" />}
        //
      >
        Add
      </Button>
      <HelpInCustomWidget />
    </Box>
  );
}

export default AddCustomWidget;
