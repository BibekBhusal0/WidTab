import useCurrentIcons from "@/hooks/useCurrentIcons";
import { toggleLocked } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";

function Lock() {
  const dispatch = useDispatch();
  const { lock, unlock } = useCurrentIcons();
  const { locked } = useSelector((state: StateType) => state.layout);

  const toggle = () => dispatch(toggleLocked());

  return (
    <Tooltip title={locked ? "Unlock" : "Lock"}>
      <IconButton onClick={toggle}>{locked ? unlock : lock}</IconButton>
    </Tooltip>
  );
}

export default Lock;
