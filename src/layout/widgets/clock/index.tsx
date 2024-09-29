import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { ClockWidgetType } from "@/types/slice/widgets";
import { Textfit } from "@ataverascrespo/react18-ts-textfit";

interface DigitalClockProps extends ClockWidgetType {
  time: Date;
}

interface AnalogClockProps extends ClockWidgetType {
  time: Date;
}

function ClockWidget({ ...props }: ClockWidgetType) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { clockType = "digital" } = props;

  return (
    <div className="size-full flex-center p-2">
      {clockType === "digital" ? (
        <DigitalClock time={time} {...props} />
      ) : (
        <AnalogClock time={time} {...props} />
      )}
    </div>
  );
}

export default ClockWidget;

const DigitalClock = ({
  time,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  TwentyFourHour,
  showSeconds,
}: DigitalClockProps) => {
  const [resizeFlag, setResizeFlag] = useState(0);
  const textFitRef = useRef<HTMLDivElement | null>(null);

  const formatTime = useCallback(() => {
    const format = `${TwentyFourHour ? "HH:mm" : "hh:mm"}${showSeconds ? ":ss" : ""}`;
    return moment.tz(time, timeZone).format(format);
  }, [time, timeZone, TwentyFourHour, showSeconds]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setResizeFlag((prev) => prev + 1);
    });

    if (textFitRef.current) {
      observer.observe(textFitRef.current);
    }

    return () => {
      if (textFitRef.current) {
        observer.unobserve(textFitRef.current);
      }
    };
  }, []);

  return (
    <div ref={textFitRef} className="text-center size-full flex-center">
      <Textfit
        min={20}
        max={400}
        className="size-full flex-center"
        key={resizeFlag}>
        {formatTime()}
      </Textfit>
    </div>
  );
};

const AnalogClock = ({
  time,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
}: AnalogClockProps) => {
  return <Clock value={moment.tz(time, timeZone).toDate()} />;
};
