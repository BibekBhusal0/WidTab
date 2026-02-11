import { useEffect, useState } from "react";
import { ClockWidgetType } from "@/types/slice/widgets";
import DigitalClock from "./digital";
import AnalogClock from "./analog";
import { cn } from "@/utils/cn";
import dayjs from "@/dayjsConfig";
import FitText from "@/components/fittext";
import useFullSize from "@/hooks/useFullSize";

export type DigitalClockProps = { time: dayjs.Dayjs } & ClockWidgetType;

function ClockWidget({ ...props }: ClockWidgetType) {
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs());
  const { ref, size } = useFullSize();

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
        "h-[85%]": showTimeZone,
        "h-[75%]": showTimeZone && size.height < 100,
      })}
      ref={ref}>
      {clockType === "digital" ? (
        <DigitalClock time={time} {...props} />
      ) : (
        <AnalogClock time={time} {...props} />
      )}
      {showTimeZone && (
        <div className={cn("h-[20%]", { "-mt-2": showTimeZone && size.height < 100 })}>
          <FitText min={2} className="text-center">
            {timeZone}
          </FitText>
        </div>
      )}
    </div>
  );
}

export default ClockWidget;
