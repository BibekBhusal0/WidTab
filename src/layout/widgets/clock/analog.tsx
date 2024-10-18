import { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { DigitalClockProps } from ".";
import { useTheme } from "@mui/material/styles";

const AnalogClock = ({
  time,
  showSeconds,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  TwentyFourHour,
}: DigitalClockProps) => {
  const {
    palette: {
      primary: { main },
      text: { primary },
    },
  } = useTheme();
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
        value={moment.tz(time, timeZone).toDate()}
        className="custom-clock"
        renderNumbers={TwentyFourHour}
      />
      <style>{`
        .custom-clock .react-clock__face {
            border: 2px solid ${primary};
        }
          .custom-clock .react-clock__mark__body{
            background-color: ${primary};
        }
        .custom-clock .react-clock__hand__body{
          background-color: ${primary};
        }
          .custom-clock .react-clock__second-hand__body{
            background-color: ${main};
          }
          .custom-clock .react-clock__mark__number{
            font-size: ${fontSize}px;
          }

      `}</style>
    </div>
  );
};

export default AnalogClock;
