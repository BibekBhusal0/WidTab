import useCurrentLayout from "@/hooks/useCurrentLayout";
import { currentSpaceToggleLocked } from "@/redux/slice/layout";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton, Switch, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";

function Lock({ type = "button" }: { type?: "button" | "toggle" }) {
  const dispatch = useDispatch();
  const space = useCurrentLayout();
  var locked = false;
  if (space?.locked) locked = true;
  const toggle = () => dispatch(currentSpaceToggleLocked());

  return (
    <>
      {type === "button" ? (
        <Tooltip title={locked ? "Unlock" : "Lock"}>
          <IconButton onClick={toggle}>
            {locked ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
          </IconButton>
        </Tooltip>
      ) : (
        <Switch checked={locked} onChange={toggle} />
      )}
    </>
  );
}

export default Lock;
