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
      icon: <SwapVertIcon color={sorted ? "primary" : "action"} />,
      onClick: handleSort,
    },
    {
      name: `${filtered ? "Show" : "Hide"} Done`,
      icon: filtered ? <VisibilityIcon /> : <VisibilityOffIcon />,
      onClick: handleFilter,
    },
    { name: "Delete", icon: <DeleteIcon />, onClick: handleDelete },
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
        {items.map(({ name, icon, onClick }) => (
          <MenuItem className="flex-center gap-3" key={name} onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <Box
              sx={{ color: name === "Sort" && sorted ? "primary.main" : "" }}
              className="text-xl">
              {name}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default TodoMenu;
