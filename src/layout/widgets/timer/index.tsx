import { TimerWidgetType } from "@/types/slice/widgets";
import { useState, useEffect } from "react";
import dayjs from "@/dayjsConfig";
import FitText from "@/components/fittext";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import Button, { ButtonProps } from "@mui/material/Button";
import useFullSize from "@/hooks/useFullSize";
import { cn } from "@/utils/cn";
import MusicWidget from "./music";
import { useDispatch } from "react-redux";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { Icon2RN } from "@/theme/icons";
import { updateTimerHistory } from "@/redux/slice/habit-tracker";
import { tost } from "@/components/tost";

function TimerWidget(props: TimerWidgetType) {
  const { id, time, music = false, running = false } = props;
  const totalDuration = dayjs.duration(time, "minutes").asSeconds();
  const [remainingTime, setRemainingTime] = useState(totalDuration);
  const isPlaying = running;
  const dispatch = useDispatch();
  const { reset } = useCurrentIcons();
  const setIsPlaying = (v: boolean) =>
    dispatch(
      currentSpaceEditWidget({
        type: "timer",
        values: { ...props, running: v },
      })
    );
  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    let intervalId = null;
    if (isPlaying && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 1) {
            dispatch(updateTimerHistory(time));
            tost({ severity: "success", children: "Timer Finished" });
            setIsPlaying(false);
            return totalDuration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, remainingTime]);

  useEffect(() => {
    setIsPlaying(false);
    setRemainingTime(totalDuration);
  }, [time]);

  const {
    ref,
    size: { height, width },
  } = useFullSize();

  const resetTimer = () => {
    dispatch(updateTimerHistory(time - Math.floor(remainingTime / 60)));
    setRemainingTime(totalDuration);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const calculateProgress = () => ((totalDuration - remainingTime) / totalDuration) * 100;

  const showMusic = music && height > 400;
  const h = showMusic ? (height * 4) / 6 : height;
  const radius = Math.min(width, h) / 2 - 10;
  const dia = radius * 2;
  const angle = 45;
  const chart = {
    width,
    height: h,
    innerRadius: radius * 0.78,
    outerRadius: radius,
    endAngle: -angle,
    startAngle: 180 + angle,
  };

  const sm = dia < 400;
  const md = dia < 500;
  type btnText = "Pause" | "Start" | "Resume";
  const icon: Record<btnText, string> = {
    Pause: "mingcute:pause-fill",
    Start: "mingcute:play-fill",
    Resume: "mingcute:play-fill",
  };
  const btn1Text: btnText = isPlaying
    ? "Pause"
    : totalDuration === remainingTime
      ? "Start"
      : "Resume";

  const commonButtonProps: ButtonProps = {
    size: sm ? "small" : md ? "medium" : "large",
    className: "icon-lg",
    sx: sm ? { width: "42px", minWidth: "42px" } : {},
  };
  const buttons: ButtonProps[] = [
    {
      variant: "contained",
      onClick: togglePlay,
      children: sm ? <Icon2RN icon={icon[btn1Text]} /> : btn1Text,
      startIcon: sm ? null : <Icon2RN icon={icon[btn1Text]} />,
    },
    {
      variant: "outlined",
      onClick: resetTimer,
      children: sm ? <Icon2RN icon={reset} /> : "Reset",
      color: "error",
      startIcon: sm ? null : <Icon2RN icon={reset} />,
    },
  ];
  return (
    <div key={id} ref={ref} className="size-full">
      <div className={cn("relative w-full", showMusic ? "h-4/6 border-b-2 pb-3" : "h-full")}>
        <RadialBarChart data={[{ value: calculateProgress() }]} {...chart}>
          <PolarAngleAxis angleAxisId={0} domain={[0, 100]} tick={false} type="number" />
          <RadialBar
            dataKey="value"
            fill="var(--mui-palette-primary-main)"
            background={{ fill: "var(--mui-palette-divider)" }}
            isAnimationActive={false}
            {...chart}
          />
        </RadialBarChart>
        <div
          className="absolute-center flex-center h-full px-3"
          style={{ width: `${dia * 0.75}px` }}>
          <FitText
            aria-label="time"
            min={10}
            max={120}
            className="flex-center size-full"
            children={formatTime(remainingTime)}
          />
        </div>
        <div
          className="absolute-center flex-center gap-4"
          style={{
            transform: `translateY(${radius * 0.4}px)`,
          }}>
          {buttons.map((buttonProps, index) => (
            <Button
              key={index}
              {...commonButtonProps}
              {...buttonProps}
              className={cn(commonButtonProps?.className, buttonProps?.className)}
            />
          ))}
        </div>
      </div>
      {music && (
        <div className={cn("h-2/6 w-full", height <= 400 && "hidden")}>
          <MusicWidget play_={isPlaying} />
        </div>
      )}
    </div>
  );
}

export default TimerWidget;
