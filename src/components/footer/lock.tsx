import useCurrentLayout from "@/hooks/useCurrentLayout";
import { currentSpaceToggleLocked } from "@/redux/slice/layout";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";

function Lock() {
  const dispatch = useDispatch();
  const space = useCurrentLayout();
  var locked = false;
  if (space?.locked) locked = true;

  return (
    <Tooltip title={locked ? "Unlock" : "Lock"}>
      <IconButton onClick={() => dispatch(currentSpaceToggleLocked())}>
        {locked ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default Lock;
