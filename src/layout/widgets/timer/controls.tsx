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
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import TimerStats from "./stats";

function TimerCOntrols({ id }: { id: number }) {
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
  const { music = false, time, running } = props;
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
          <div className="text-xl">Time</div>
          <OutlinedInput
            size="small"
            sx={{ width: "120px" }}
            value={time}
            onChange={(e) => changeTime(parseInt(e.target.value) || 0)}
            endAdornment={<InputAdornment position="end">min</InputAdornment>}
            type="number"
          />
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

export default TimerCOntrols;
