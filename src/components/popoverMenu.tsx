import { useState } from "react";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

function MenuPopover({
  children,
  icon = <MenuIcon />,
  buttonProps = undefined,
  menuProps = undefined,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  buttonProps?: ListItemButtonProps;
  menuProps?: MenuProps;
}) {
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
        {icon}
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
