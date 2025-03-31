import { useCallback } from "react";
import { DigitalClockProps } from ".";
import dayjs from "@/dayjsConfig";
import FitText from "@/components/fittext";

const DigitalClock = ({
  time,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  TwentyFourHour,
  showSeconds,
}: DigitalClockProps) => {
  const formatTime = useCallback(() => {
    const format = `${TwentyFourHour ? "HH:mm" : "hh:mm"}${showSeconds ? ":ss" : ""} ${TwentyFourHour ? "" : "A"}`;
    return dayjs.tz(time, timeZone).format(format);
  }, [time, timeZone, TwentyFourHour, showSeconds]);

  return (
    <FitText max={300} className="size-full flex-center">
      {formatTime()}
    </FitText>
  );
};

export default DigitalClock;
