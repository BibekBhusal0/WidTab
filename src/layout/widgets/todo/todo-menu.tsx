import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, ListItemIcon } from "@mui/material";
import { todoMenuProps } from "@/types/slice/todo";

function TodoMenu({
  handleDelete,
  handleSort,
  handleFilter,
  sorted,
  filtered,
}: todoMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const items = [
    {
      name: "Sort",
      Icon: SwapVertIcon,
      onClick: handleSort,
      color: sorted ? "primary.main" : "action.main",
    },
    {
      name: `${filtered ? "Show" : "Hide"} Done`,
      Icon: filtered ? VisibilityIcon : VisibilityOffIcon,
      onClick: handleFilter,
      color: "action.main",
    },
    {
      name: "Delete",
      Icon: DeleteIcon,
      onClick: handleDelete,
      color: "error.main",
    },
  ];

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <MenuIcon />
      </ListItemButton>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {items.map(({ name, Icon, onClick, color }) => (
          <MenuItem
            sx={{ color: color }}
            className="flex-center gap-3"
            key={name}
            onClick={onClick}>
            <ListItemIcon>
              <Icon sx={{ color: color }} />
            </ListItemIcon>
            <Box sx={{ color: color }} className="text-xl">
              {name}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default TodoMenu;
