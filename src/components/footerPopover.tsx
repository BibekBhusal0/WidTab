import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Popover, Tooltip } from "@mui/material";

import { ReactNode, useState } from "react";

function FooterPopover({
  icon = <SettingsIcon />,
  children = <></>,
  tooltip = undefined,
}: {
  icon?: ReactNode;
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

  return (
    <>
      {tooltip ? (
        <Tooltip title={tooltip}>
          <IconButton onClick={handleOpen} aria-label="settings">
            {icon}
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton onClick={handleOpen} aria-label="settings">
          {icon}
        </IconButton>
      )}
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
