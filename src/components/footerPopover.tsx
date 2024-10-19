import { Icon2RN, iconAsProp } from "@/icons";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

function FooterPopover({
  icon = "material-symbols:settings",
  children = <></>,
  tooltip = undefined,
}: {
  icon?: iconAsProp;
  children?: JSX.Element;
  tooltip?: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const btn = (
    <IconButton
      className="text-center overflow-visible"
      onClick={handleOpen}
      aria-label="settings">
      <Icon2RN icon={icon} />
    </IconButton>
  );

  return (
    <>
      {tooltip ? <Tooltip title={tooltip}>{btn}</Tooltip> : btn}
      <Popover
        anchorEl={anchorEl}
        marginThreshold={30}
        open={open}
        onClose={handleClose}>
        {children}
      </Popover>
    </>
  );
}

export default FooterPopover;
