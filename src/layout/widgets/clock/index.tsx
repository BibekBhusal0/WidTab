import { useEffect, useState } from "react";
import { ClockWidgetType } from "@/types/slice/widgets";
import DigitalClock, { FitText } from "./digital";
import AnalogClock from "./analog";
import { cn } from "@/utils/cn";
import dayjs from "@/dayjsConfig";

export type DigitalClockProps = { time: dayjs.Dayjs } & ClockWidgetType;

function ClockWidget({ ...props }: ClockWidgetType) {
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    const updateTime = () => setTime(dayjs());
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const {
    clockType = "digital",
    showTimeZone,
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  } = props;
  props.clockType = clockType;
  props.timeZone = timeZone;

  return (
    <div
      className={cn("relative w-full flex-col items-center", {
        "h-full": !showTimeZone,
        "h-[90%]": showTimeZone,
      })}>
      {clockType === "digital" ? (
        <DigitalClock time={time} {...props} />
      ) : (
        <AnalogClock time={time} {...props} />
      )}
      {showTimeZone && (
        <div className="relative h-[10%]">
          <FitText>{timeZone}</FitText>
        </div>
      )}
    </div>
  );
}

export default ClockWidget;
