import { useEffect, useState } from "react";
import { ClockWidgetType } from "@/types/slice/widgets";
import DigitalClock from "./digital";
import AnalogClock from "./analog";
import ClockControls from "./controls";

export interface DigitalClockProps extends ClockWidgetType {
  time: Date;
}

function ClockWidget({ ...props }: ClockWidgetType) {
  const [time, setTime] = useState<Date>(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { clockType = "digital" } = props;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="size-full flex-center">
      {clockType === "digital" ? (
        <DigitalClock time={time} {...props} />
      ) : (
        <AnalogClock time={time} {...props} />
      )}
      {isHovered && <ClockControls {...props} />}
    </div>
  );
}

export default ClockWidget;
