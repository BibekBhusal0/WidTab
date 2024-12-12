import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import SimpleAddWidgetButton from "./simpleAddWidget";

function DateTime() {
  const [time, setTime] = useState(120);
  return (
    <div className="flex-center flex-col gap-4 size-full">
      <SimpleAddWidgetButton widget={{ type: "calendar", values: { id: 0 } }} />
      <SimpleAddWidgetButton widget={{ type: "clock", values: { id: 0 } }} />
      <div className="w-full my-4 border-divider border-t-2 " />
      <div className="full-between">
        <div className="text-xl">Timer</div>
        <OutlinedInput
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value) || 0)}
          endAdornment={<InputAdornment position="end">Minutes</InputAdornment>}
          type="number"
        />
      </div>
      <SimpleAddWidgetButton
        widget={{ type: "timer", values: { id: 0, time } }}
      />
    </div>
  );
}
export default DateTime;
