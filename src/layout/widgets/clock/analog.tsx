import { useEffect, useRef, useState } from "react";
import dayjs from "@/dayjsConfig";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { DigitalClockProps } from ".";

const AnalogClock = ({
  time,
  showSeconds,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  TwentyFourHour,
}: DigitalClockProps) => {
  const [size, setSize] = useState(150);
  const clockContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (clockContainerRef.current) {
        const width = clockContainerRef.current.clientWidth;
        const height = clockContainerRef.current.clientHeight;
        const clockSize = Math.min(width, height);
        setSize(clockSize - 30);
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (clockContainerRef.current) {
      observer.observe(clockContainerRef.current);
    }
    handleResize();

    return () => {
      if (clockContainerRef.current) {
        observer.unobserve(clockContainerRef.current);
      }
    };
  }, []);
  const fontSize = size <= 150 ? 6 : Math.max(6, size / 25);
  return (
    <div
      ref={clockContainerRef}
      className="size-full flex-center relative aspect-square">
      <Clock
        size={size}
        renderSecondHand={showSeconds === true}
        value={dayjs.tz(time, timeZone).toDate()}
        className="clock-widget"
        renderNumbers={TwentyFourHour}
      />
      <style>{`
          .clock-widget .react-clock__mark__number{
            font-size: ${fontSize}px;
          }
      `}</style>
    </div>
  );
};

export default AnalogClock;
