import dayjs from "@/dayjsConfig";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { controlledWidgetValues } from "@/types/slice/widgets";

function Calendar({ id }: controlledWidgetValues) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        reduceAnimations={false}
        key={id}
        value={dayjs()}
        onChange={() => null}
        readOnly
        views={["day"]}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
