import { useState } from "react";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import Menu, { MenuProps } from "@mui/material/Menu";
import { Icon2RN, iconAsProp } from "@/icons";

export interface MenuPopoverProps {
  children: React.ReactNode;
  icon?: iconAsProp;
  buttonProps?: ListItemButtonProps;
  menuProps?: MenuProps;
}

function MenuPopover({
  children,
  icon = "material-symbols:menu",
  buttonProps = undefined,
  menuProps = undefined,
}: MenuPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemButton {...buttonProps} onClick={handleClick}>
        <Icon2RN icon={icon} />
      </ListItemButton>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        {...menuProps}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        //
      >
        {children}
      </Menu>
    </>
  );
}

export default MenuPopover;
