import dayjs from "@/dayjsConfig";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import SimpleWidget from "../simpleWidget";
import { controlledWidgetValues } from "@/types/slice/widgets";

function Calendar({ id }: controlledWidgetValues) {
  return (
    <SimpleWidget id={id} type="calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs()}
          onChange={() => null}
          readOnly
          views={["day"]}
        />
      </LocalizationProvider>
    </SimpleWidget>
  );
}

export default Calendar;
