import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import IconButton from "@mui/material/IconButton";
import calmAcoustic from "@/assets/music/calm-acoustic-quiet-quest-251658.mp3";
import calmNightPiano from "@/assets/music/calm-night-piano-music-249235.mp3";
import relaxingPiano from "@/assets/music/relaxing-piano-music-248868.mp3";

export type MusicObjectType = {
  title: string;
  artist?: string;
  path: string;
};

export const allMusic: MusicObjectType[] = [
  {
    title: "Calm Acoustic Quiet Quest",
    artist: "TurtleBeats",
    path: calmAcoustic,
  },
  {
    title: "Calm Night Piano Music",
    artist: "CalvinClavier",
    path: calmNightPiano,
  },
  {
    title: "Relaxing Piano Music",
    artist: "CalvinClavier",
    path: relaxingPiano,
  },
];

export default function MusicWidget({ play_ = false }: { play_?: boolean }) {
  const [currentSong, setCurrentSong] = useState(0);
  const [play, setPlay] = useState(play_);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => setPlay(play_), [play_]);

  useEffect(() => {
    if (play && audioRef.current?.paused) audioRef.current?.play();
    else if (!play && audioRef.current?.played) audioRef.current?.pause();
  }, [play]);

  useEffect(() => {
    audioRef.current?.load();
    if (play) audioRef.current?.play();
  }, [currentSong]);

  const handleClick = () => {
    setPlay((prevValue) => !prevValue);
  };

  const handleNext = () => {
    setCurrentSong((prevValue) => (prevValue + 1) % allMusic.length);
  };

  const handlePrev = () => {
    setCurrentSong((prevValue) => (prevValue - 1 + allMusic.length) % allMusic.length);
  };

  const Buttons = [
    { onClick: handlePrev, icon: "mingcute:skip-previous-fill" },
    { onClick: handleClick, icon: `mingcute:${play ? "pause" : "play"}-fill` },
    { onClick: handleNext, icon: "mingcute:skip-forward-fill" },
  ];

  const { title, artist, path } = allMusic[currentSong];
  const animatedMusicCls = cn("text-white transition-all", {
    hidden: !play,
    "duration-1000 animate-in zoom-in direction-alternate-reverse repeat-infinite": play,
  });
  const animatedMusicIcons = [
    { className: "delay-500", icon: "lucide-music" },
    { className: "", icon: "lucide-music-2" },
    { className: "delay-300", icon: "lucide-music-3" },
  ];

  return (
    <>
      <audio
        ref={audioRef}
        src={path}
        loop
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
      />
      <div className="flex size-full flex-col p-4 gap-4">
        <div
          aria-label="title-and-music-icons"
          className="relative flex flex-1 flex-col justify-between">
          <div className="full-between gap-3">
            <div className="flex flex-col gap-2">
              <p className="line-clamp-1 w-full text-2xl font-bold leading-none truncate">
                {title}
              </p>
              <p className="line-clamp-1 text-sm font-semibold leading-none truncate">{artist}</p>
            </div>

            <div className="flex-center h-fit w-12 flex-wrap gap-1 text-lg">
              {animatedMusicIcons.map(({ icon, className }, index) => (
                <Icon key={index} icon={icon} className={cn(animatedMusicCls, className)} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-evenly icon-2xl">
          {Buttons.map(({ onClick, icon }, index) => (
            <IconButton key={index} onClick={onClick}>
              <Icon icon={icon} />
            </IconButton>
          ))}
        </div>
      </div>
    </>
  );
}
