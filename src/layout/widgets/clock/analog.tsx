import dayjs from "@/dayjsConfig";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { DigitalClockProps } from ".";
import useFullSize from "@/hooks/useFullSize";

const AnalogClock = ({
  time,
  showSeconds,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  TwentyFourHour,
}: DigitalClockProps) => {
  const {
    ref,
    size: { width, height },
  } = useFullSize();
  const clockSize = Math.min(width, height) - 30;
  const fontSize = clockSize <= 150 ? 6 : Math.max(6, clockSize / 25);
  return (
    <div ref={ref} className="size-full flex-center relative" style={{ fontSize }}>
      <Clock
        size={clockSize}
        renderSecondHand={showSeconds === true}
        value={dayjs.tz(time, timeZone).toDate()}
        className="clock-widget"
        renderNumbers={TwentyFourHour}
      />
    </div>
  );
};

export default AnalogClock;
