import { useState } from "react";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import Menu, { MenuProps } from "@mui/material/Menu";
import { Icon2RN, iconAsProp } from "@/theme/icons";
import useCurrentIcons from "@/hooks/useCurrentIcons";

export interface MenuPopoverProps {
  children: React.ReactNode;
  icon?: iconAsProp;
  buttonProps?: ListItemButtonProps;
  menuProps?: Partial<MenuProps>;
}

function MenuPopover({
  children,
  icon = undefined,
  buttonProps = undefined,
  menuProps = undefined,
}: MenuPopoverProps) {
  const { menu } = useCurrentIcons();
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
        <Icon2RN icon={icon || menu} />
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
