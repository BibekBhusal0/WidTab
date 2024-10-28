import { useEffect, useState } from "react";
import { ClockWidgetType } from "@/types/slice/widgets";
import DigitalClock, { FitText } from "./digital";
import AnalogClock from "./analog";
import { cn } from "@/utils/cn";

export type DigitalClockProps = { time: Date } & ClockWidgetType;

function ClockWidget({ ...props }: ClockWidgetType) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { clockType = "digital", showTimeZone, timeZone } = props;
  props.clockType = clockType;
  props.timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

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
