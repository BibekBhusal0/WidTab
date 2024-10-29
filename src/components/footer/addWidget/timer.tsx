import { useState } from "react";
import SimpleAddWidgetButton from "./simpleAddWidget";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

function AddTimer() {
  const [time, setTime] = useState(120);
  return (
    <div className="flex-center flex-col gap-4 size-full">
      <OutlinedInput
        value={time}
        onChange={(e) => setTime(parseInt(e.target.value) || 0)}
        endAdornment={<InputAdornment position="end">Minutes</InputAdornment>}
        type="number"
      />
      <SimpleAddWidgetButton
        widget={{ type: "timer", values: { id: 0, time } }}
      />
    </div>
  );
}

export default AddTimer;
