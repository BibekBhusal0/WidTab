import { useCallback, useEffect, useRef, useState } from "react";
import { Textfit, TextfitProps } from "@ataverascrespo/react18-ts-textfit";
import { DigitalClockProps } from ".";
import dayjs from "@/dayjsConfig";
import Box, { BoxProps } from "@mui/material/Box";
import { cn } from "@/utils/cn";

const DigitalClock = ({
  time,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  TwentyFourHour,
  showSeconds,
}: DigitalClockProps) => {
  const formatTime = useCallback(() => {
    const format = `${TwentyFourHour ? "HH:mm" : "hh:mm"}${showSeconds ? ":ss" : ""} ${TwentyFourHour ? "" : "A"}`;
    return dayjs.tz(time, timeZone).format(format);
  }, [time, timeZone, TwentyFourHour, showSeconds]);

  return (
    <FitText min={20} max={400} className="size-full flex-center">
      {formatTime()}
    </FitText>
  );
};

export type FitTextProps = { containerProps?: BoxProps } & TextfitProps;
export const FitText = ({ containerProps, ...props }: FitTextProps) => {
  const [resizeKey, setResizeKey] = useState(0);
  const textFitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => setResizeKey((prev) => prev + 1));
    if (textFitRef.current) observer.observe(textFitRef.current);

    return () => {
      if (textFitRef.current) observer.unobserve(textFitRef.current);
    };
  }, []);

  return (
    <Box
      {...containerProps}
      ref={textFitRef}
      className={cn(
        "text-center size-full flex-center",
        containerProps?.className
      )}>
      <Textfit {...props} key={resizeKey}></Textfit>
    </Box>
  );
};

export default DigitalClock;
