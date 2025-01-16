import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import useAvailablePosition from "@/hooks/useAvailablePosition";
import HelpInCustomWidget from "./helpCustom";
import { useState } from "react";
import { getUrlFromString } from "@/utils/url";

function AddCustomWidget() {
  const dispatch = useDispatch();
  const { n_cols, n_rows } = useSelector((state: StateType) => state.layout);
  const [text, setText] = useState("");
  const [helperText, setHelperText] = useState("");
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const available_widgets = useAvailablePosition(cols, rows);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
    if (helperText) setHelperText("");
  };
  const add = () => {
    if (!available_widgets) return;
    if (text.trim() === "") return setHelperText("URL can't be empty");
    const extractedURL = getUrlFromString(text);
    if (!extractedURL) return setHelperText("Enter valid URL");
    dispatch(
      currentSpaceAddWidget({
        gridProps: available_widgets,
        type: "custom",
        values: { id: 0, url: extractedURL },
      })
    );
    setText("");
    setHelperText("");
  };
  return (
    <div className="size-full relative flex flex-col gap-3 pt-3">
      <TextField
        helperText={helperText}
        error={!!helperText}
        autoFocus
        onChange={handleTextChange}
        value={text}
        label="Widget URL"
        placeholder="Widget URL"
      />
      <div className="flex items-center px-3 gap-2 flex-col">
        <div className="flex justify-start gap-5 w-full">
          <div className="text-xl">X:</div>
          <Slider
            value={cols}
            onChange={(_, value) => setCols(value as number)}
            min={1}
            max={n_cols}
          />
        </div>
        <div className="flex justify-start gap-5 w-full">
          <div className="text-xl">Y:</div>
          <Slider
            value={rows}
            onChange={(_, value) => setRows(value as number)}
            min={1}
            max={n_rows}
          />
        </div>
        <div className="text-xl">
          Position: ({cols}, {rows})
        </div>
        {!available_widgets && (
          <div className="text-error-main">No space available</div>
        )}
      </div>

      <Button
        disabled={available_widgets === null}
        onClick={add}
        variant="contained"
        className="mx-5"
        startIcon={<Icon icon="material-symbols:add" />}
        //
      >
        Add
      </Button>
      <HelpInCustomWidget />
    </div>
  );
}

export default AddCustomWidget;
