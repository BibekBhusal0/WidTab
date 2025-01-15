import { useState } from "react";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import Menu, { MenuProps } from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { Icon2RN, iconAsProp } from "@/theme/icons";
import useCurrentIcons from "@/hooks/useCurrentIcons";

export interface MenuPopoverProps {
  children: React.ReactNode;
  icon?: iconAsProp;
  buttonProps?: ListItemButtonProps;
  menuProps?: Partial<MenuProps>;
  button?: boolean;
}

function MenuPopover({
  children,
  icon = undefined,
  buttonProps = undefined,
  menuProps = undefined,
  button = true,
}: MenuPopoverProps) {
  const { menu } = useCurrentIcons();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const i = <Icon2RN icon={icon || menu} />;

  return (
    <>
      {button ? (
        <ListItemButton
          {...buttonProps}
          sx={{ px: "8px", py: "4px", ...buttonProps?.sx }}
          onClick={handleClick}
          children={i}
        />
      ) : (
        <Box {...buttonProps} children={i} onClick={handleClick} />
      )}
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
