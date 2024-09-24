import useCurrentLayout from "@/hooks/useCurrentLayout";
import { currentSpaceToggleLocked } from "@/redux/slice/layout";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

function Lock() {
  const dispatch = useDispatch();
  const space = useCurrentLayout();
  var locked = false;
  if (space?.locked) locked = true;

  return (
    <IconButton onClick={() => dispatch(currentSpaceToggleLocked())}>
      {locked ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
    </IconButton>
  );
}

export default Lock;
