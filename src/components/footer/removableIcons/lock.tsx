import useCurrentIcons from "@/hooks/useCurrentIcons";
import { useLayout } from "@/storage";
import { toggleLocked } from "@/storage/layout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function Lock() {
  const { lock, unlock } = useCurrentIcons();
  const { locked } = useLayout();
  const toggle = () => toggleLocked();

  return (
    <Tooltip title={locked ? "Unlock" : "Lock"}>
      <IconButton onClick={toggle}>{locked ? unlock : lock}</IconButton>
    </Tooltip>
  );
}

export default Lock;
