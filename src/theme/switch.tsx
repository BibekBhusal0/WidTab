import { Icon } from "@iconify/react";
import { useRef, useEffect } from "react";
import useCurrentTheme from "@/hooks/useCurrentTheme";
import IconButton from "@mui/material/IconButton";
import { toggleCurrentMode } from "@/storage/theme";

function ThemeSwitch() {
  const firstRender = useRef(true);
  const { mode } = useCurrentTheme();

  useEffect(() => {
    setTimeout(() => {
      firstRender.current = false;
    }, 1);
  }, []);

  if (!mode) return null;
  const startIcon =
    mode === "dark" ? "line-md:moon-filled-loop" : "line-md:sunny-filled-loop";
  const transitionIcon =
    mode === "light"
      ? "line-md:moon-filled-to-sunny-filled-loop-transition"
      : "line-md:sunny-filled-loop-to-moon-filled-loop-transition";

  const handleClick = () => toggleCurrentMode();

  return (
    <IconButton onClick={handleClick}>
      <Icon
        key={mode}
        icon={firstRender.current ? startIcon : transitionIcon}
      />
    </IconButton>
  );
}

export default ThemeSwitch;
