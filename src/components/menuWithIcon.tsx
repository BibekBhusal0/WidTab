import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ReactNode } from "react";
import { Icon2RN, iconAsProp } from "@/icons";

export type IconMenuType = {
  name: ReactNode;
  icon: iconAsProp;
  onClick?: () => void;
  color?: string;
};

export type IconMenuProps = {
  menuItems: IconMenuType[];
};

function IconMenu({ menuItems }: IconMenuProps) {
  return (
    <>
      {menuItems.map(({ name, icon, onClick, color }, i) => (
        <MenuItem
          sx={{ color: color }}
          className="flex-center gap-3 icon-lg"
          key={i}
          onClick={onClick}>
          <ListItemIcon sx={{ color: color }}>
            <Icon2RN icon={icon} />
          </ListItemIcon>
          <Box sx={{ color: color }} className="text-xl">
            {name}
          </Box>
        </MenuItem>
      ))}
    </>
  );
}

export default IconMenu;
