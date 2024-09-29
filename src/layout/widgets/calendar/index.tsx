import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar defaultValue={dayjs()} readOnly views={["day"]} />
    </LocalizationProvider>
  );
};

export default Calendar;
