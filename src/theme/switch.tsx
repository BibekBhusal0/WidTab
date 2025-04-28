import { Icon } from "@iconify/react";
import { useRef, useEffect } from "react";
import useCurrentTheme from "@/hooks/useCurrentTheme";
import { useDispatch } from "react-redux";
import { toggleCurrentMode } from "@/redux/slice/theme";
import IconButton from "@mui/material/IconButton";

function ThemeSwitch() {
  const firstRender = useRef(true);
  const { mode } = useCurrentTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      firstRender.current = false;
    }, 1);
  }, []);

  if (!mode) return null;
  const startIcon = mode === "dark" ? "line-md:moon-filled-loop" : "line-md:sunny-filled-loop";
  const transitionIcon =
    mode === "light"
      ? "line-md:moon-filled-to-sunny-filled-loop-transition"
      : "line-md:sunny-filled-loop-to-moon-filled-loop-transition";

  const handleClick = () => dispatch(toggleCurrentMode());

  return (
    <IconButton onClick={handleClick}>
      <Icon key={mode} icon={firstRender.current ? startIcon : transitionIcon} />
    </IconButton>
  );
}

export default ThemeSwitch;
