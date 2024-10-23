import { useEffect, useState } from "react";
import { ClockWidgetType } from "@/types/slice/widgets";
import DigitalClock from "./digital";
import AnalogClock from "./analog";
import ClockControls from "./controls";
import HoverControls from "@/components/hoverControls";

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

  const { clockType = "digital" } = props;

  return (
    <HoverControls
      className="size-full flex-center"
      controls={<ClockControls {...props} />}>
      {clockType === "digital" ? (
        <DigitalClock time={time} {...props} />
      ) : (
        <AnalogClock time={time} {...props} />
      )}
    </HoverControls>
  );
}

export default ClockWidget;
