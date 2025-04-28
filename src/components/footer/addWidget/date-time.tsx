import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import SimpleAddWidgetButton from "./simpleAddWidget";

function DateTime() {
  const [time, setTime] = useState(120);
  return (
    <div className="flex-center size-full flex-col gap-4">
      <SimpleAddWidgetButton widget={{ type: "calendar", values: { id: 0 } }} />
      <SimpleAddWidgetButton widget={{ type: "clock", values: { id: 0 } }} />
      <div className="my-4 w-full border-t-2" />
      <div className="full-between">
        <div className="text-xl">Timer</div>
        <OutlinedInput
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value) || 0)}
          endAdornment={<InputAdornment position="end">Minutes</InputAdornment>}
          type="number"
        />
      </div>
      <SimpleAddWidgetButton widget={{ type: "timer", values: { id: 0, time } }} />
      <SimpleAddWidgetButton widget={{ type: "timer-stats", values: { id: 0 } }} />
    </div>
  );
}
export default DateTime;
