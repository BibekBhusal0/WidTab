import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/redux/slice/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import { useState, useId, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import TimerStats from "./stats";
import { Icon2RN } from "@/theme/icons";

function TimerControls({ id }: { id: number }) {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  const { delete_ } = useCurrentIcons();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const statsOpen = !!anchorEl;
  const handleStatsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleStatsClose = () => setAnchorEl(null);

  if (!layout) return null;
  const { widgets } = layout;
  const widget = widgets.find((w) => w.type === "timer" && w.values.id === id);
  if (!widget || widget.type !== "timer") return null;
  const props = widget.values;
  const { music = false, running } = props;
  const toggleMusic = () =>
    dispatch(
      currentSpaceEditWidget({
        type: "timer",
        values: { ...props, music: !music },
      })
    );
  const togglePlay = () =>
    dispatch(
      currentSpaceEditWidget({
        type: "timer",
        values: { ...props, running: !running },
      })
    );
  const changeTime = (n: number) =>
    dispatch(
      currentSpaceEditWidget({
        type: "timer",
        values: { ...props, time: n },
      })
    );

  const switches: MenuSwitchProps["items"] = [
    { onChange: toggleMusic, title: "Music", checked: music },
  ];

  const deleteThis = () =>
    dispatch(currentSpaceDeleteWidget({ type: "timer", id }));

  const stats = {
    name: "Stats",
    icon: "proicons:graph",
    onClick: handleStatsOpen,
    color: statsOpen ? "primary.main" : "action.main",
  };

  const pausePlay = {
    name: running ? "Stop" : "Start",
    icon: `mingcute:${running ? "pause" : "play"}-fill`,
    onClick: togglePlay,
    color: running ? "error.main" : "action.main",
  };
  const menuItems: IconMenuType[] = [];
  if (!running) menuItems.push(stats);
  menuItems.push(pausePlay);
  const deleteButton = [
    {
      icon: delete_,
      name: "Delete",
      onClick: deleteThis,
      color: "error.main",
    },
  ];

  return (
    <>
      <IconMenu menuItems={menuItems} />
      <MenuSwitch items={switches} />
      {!running && (
        <div className="full-between p-3">
          <ChangeTime time={props.time} setTime={changeTime} />
        </div>
      )}
      <Divider />
      <IconMenu menuItems={deleteButton} />
      <Popover
        anchorEl={anchorEl}
        marginThreshold={30}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={statsOpen}
        onClose={handleStatsClose}>
        <div className="size-[400px]">
          <TimerStats />
        </div>
      </Popover>
    </>
  );
}

type changeTimeProps = { time: number; setTime: (time: number) => void };
const ChangeTime = ({ time, setTime }: changeTimeProps) => {
  const [val, setVal] = useState(time);
  useEffect(() => {
    setVal(time);
  }, [time]);
  const id = useId();
  const handleClick = () => {
    if (val > 0 && val !== time) setTime(val);
  };

  return (
    <FormControl className="flex-center w-full">
      <InputLabel htmlFor={id}> Time (min) </InputLabel>
      <OutlinedInput
        id={id}
        size="small"
        sx={{ width: "120px" }}
        label="Time (min)"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              sx={{ padding: "4px", margin: "0" }}
              onClick={handleClick}>
              <Icon2RN icon="material-symbols:check-rounded"></Icon2RN>
            </IconButton>
          </InputAdornment>
        }
        type="number"
      />
    </FormControl>
  );
};

export default TimerControls;
