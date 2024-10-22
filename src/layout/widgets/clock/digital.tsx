import { useCallback, useEffect, useRef, useState } from "react";
import { Textfit } from "@ataverascrespo/react18-ts-textfit";
import { DigitalClockProps } from ".";
import dayjs from "@/dayjsConfig";

const DigitalClock = ({
  time,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  TwentyFourHour,
  showSeconds,
}: DigitalClockProps) => {
  const [resizeKey, setResizeKey] = useState(0);
  const textFitRef = useRef<HTMLDivElement | null>(null);

  const formatTime = useCallback(() => {
    const format = `${TwentyFourHour ? "HH:mm" : "hh:mm"}${showSeconds ? ":ss" : ""} ${TwentyFourHour ? "" : "a"}`;
    return dayjs.tz(time, timeZone).format(format);
  }, [time, timeZone, TwentyFourHour, showSeconds]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setResizeKey((prev) => prev + 1);
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
    <div
      ref={textFitRef}
      className="text-center size-full flex-center p-5 uppercase">
      <Textfit
        min={20}
        style={{ height: "100%" }}
        max={400}
        className="size-full flex-center"
        key={resizeKey}>
        {formatTime()}
      </Textfit>
    </div>
  );
};

export default DigitalClock;
