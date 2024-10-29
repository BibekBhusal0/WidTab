import { TimerWidgetType } from "@/types/slice/widgets";
import { useState, useEffect } from "react";
import dayjs from "@/dayjsConfig";
import { Gauge } from "@mui/x-charts/Gauge";
import Button from "@mui/material/Button";
import useFullSize from "@/hooks/useFullSize";
import { FitText } from "../clock/digital";
import { cn } from "@/utils/cn";
import MusicWidget from "./music";

function TimerWidget({ id, time, music = false }: TimerWidgetType) {
  const totalDuration = dayjs.duration(time, "minutes").asSeconds();
  const [remainingTime, setRemainingTime] = useState(totalDuration);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isPlaying && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 1) {
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

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const {
    ref,
    size: { height },
  } = useFullSize();

  const resetTimer = () => {
    setRemainingTime(totalDuration);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const calculateProgress = () =>
    ((totalDuration - remainingTime) / totalDuration) * 100;
  const startAngle = 120;

  return (
    <div key={id} ref={ref} className="size-full">
      <div
        className={cn(
          "w-full relative",
          music && height > 400
            ? "h-4/6 pb-3 border-b-2 border-divider"
            : "h-full"
        )}>
        <Gauge
          valueMax={100}
          value={calculateProgress()}
          startAngle={-startAngle}
          sx={{ "& .MuiGauge-valueText": { display: "none" } }}
          endAngle={startAngle}
          cornerRadius={100}
        />
        <div className="absolute-center flex-center size-1/2">
          <div className="size-full">
            <FitText
              min={10}
              max={200}
              containerProps={{ className: "p-2" }}
              className="size-full flex-center">
              {formatTime(remainingTime)}
            </FitText>
            <div className="flex-center gap-4 m-2">
              <Button variant="outlined" onClick={togglePlay}>
                {isPlaying
                  ? "Pause"
                  : totalDuration === remainingTime
                    ? "Start"
                    : "Resume"}
              </Button>
              <Button variant="outlined" onClick={resetTimer}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      {music && (
        <div className={cn("w-full h-2/6", height <= 400 && "hidden")}>
          <MusicWidget play_={isPlaying} />
        </div>
      )}
    </div>
  );
}

export default TimerWidget;
