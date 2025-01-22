import {
  HabitTrackerEditProps,
  HabitTrackerItemType,
} from "@/types/slice/habit-tracker";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { FunctionComponent, useState } from "react";
import { SelectIconMenu } from "@/components/select-icon";

const HabitTrackerEdit: FunctionComponent<HabitTrackerEditProps> = ({
  initialState = {
    id: 0,
    icon: "material-symbols:potted-plant",
    increment: 10,
    target: 100,
    title: "",
    unit: "",
  },
  onChange,
  buttonProps,
}: HabitTrackerEditProps) => {
  const [state, setState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = <K extends keyof HabitTrackerItemType>(
    key: K,
    value: HabitTrackerItemType[K]
  ): void => {
    setState((prev) => ({ ...prev, [key]: value }));
  };
  const wordLimit = 15;

  const checkIfOk = () => {
    var message = "";
    if (state.title.trim() === "") {
      message = "Title is required";
    } else if (state.target <= 0) {
      message = "Target must be greater than 0";
    } else if (state.increment <= 0) {
      message = "Increment must be greater than 0";
    } else if (state.increment >= state.target) {
      message = "Increment must be less than target";
    } else if (state.unit.trim() === "") {
      message = "Unit is required";
    } else if (state.title.length > wordLimit) {
      message = "Title is too long";
    } else if (state.unit.length > wordLimit) {
      message = "Unit is too long";
    }

    setErrorMessage(message);
    return message === "";
  };

  const handleClick = () => {
    if (checkIfOk()) {
      onChange(state);
    }
  };
  const width = 130;
  const sameProp: any = { style: { width }, size: "small" };
  const items = {
    Title: (
      <TextField
        {...sameProp}
        label="Title"
        value={state.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
    ),
    Target: (
      <OutlinedInput
        {...sameProp}
        size="small"
        type="number"
        value={state.target}
        onChange={(e) => handleChange("target", Number(e.target.value))}
      />
    ),
    Increment: (
      <OutlinedInput
        {...sameProp}
        size="small"
        type="number"
        value={state.increment}
        onChange={(e) => handleChange("increment", Number(e.target.value))}
      />
    ),
    Unit: (
      <TextField
        {...sameProp}
        size="small"
        label="Unit"
        value={state.unit}
        onChange={(e) => handleChange("unit", e.target.value)}
      />
    ),
    Icon: (
      <div className="w-14 flex-center">
        <SelectIconMenu
          icon={state.icon}
          setIcon={(icon: string) => handleChange("icon", icon)}
        />
      </div>
    ),
  };

  return (
    <div className="flex-center flex-col w-full gap-4">
      {Object.entries(items).map(([key, value]) => (
        <div key={key} className="full-between">
          <div className="text-xl">{key}</div>
          {value}
        </div>
      ))}
      {errorMessage !== "" && (
        <div className="text-error-main">{errorMessage}</div>
      )}
      <div className="w-full flex-center">
        <Button
          variant="contained"
          children="Done"
          {...buttonProps}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default HabitTrackerEdit;
