import useCurrentLayout from "@/hooks/useCurrentLayout";
import { currentSpaceToggleLocked } from "@/redux/slice/layout";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton, Switch, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";

function Lock({ type = "button" }: { type?: "button" | "toggle" }) {
  const dispatch = useDispatch();
  const space = useCurrentLayout();
  if (!space) return null;

  //   if (space?.locked) locked = true;
  const toggle = () => dispatch(currentSpaceToggleLocked());

  return (
    <>
      {type === "button" ? (
        <Tooltip title={space.locked ? "Unlock" : "Lock"}>
          <IconButton onClick={toggle}>
            {space.locked ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
          </IconButton>
        </Tooltip>
      ) : (
        <Switch checked={space.locked} onChange={toggle} />
      )}
    </>
  );
}

export default Lock;
