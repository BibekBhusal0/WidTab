import MenuItem from "@mui/material/MenuItem";
import { Box, ListItemIcon } from "@mui/material";
import MenuPopover, { MenuPopoverProps } from "@/components/popoverMenu";
import { ReactNode } from "react";

export type IconMenuType = {
  name: ReactNode;
  Icon: ReactNode;
  onClick: () => void;
  color?: string;
};

export type IconMenuProps = {
  menuItems: IconMenuType[];
} & Partial<MenuPopoverProps>;

function IconMenu({ menuItems, ...menuPopoverProps }: IconMenuProps) {
  return (
    <MenuPopover {...menuPopoverProps}>
      {menuItems.map(({ name, Icon, onClick, color }, i) => (
        <MenuItem
          sx={{ color: color }}
          className="flex-center gap-3"
          key={i}
          onClick={onClick}>
          <ListItemIcon sx={{ color: color }}>{Icon}</ListItemIcon>
          <Box sx={{ color: color }} className="text-xl">
            {name}
          </Box>
        </MenuItem>
      ))}
    </MenuPopover>
  );
}

export default IconMenu;
