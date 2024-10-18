import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";

import { todoMenuProps } from "@/types/slice/todo";
import { BsPinAngleFill } from "react-icons/bs";
import MenuPopover from "@/components/popoverMenu";

function TodoMenu({
  handleDelete,
  handleSort,
  handleFilter,
  handlePin,
  pinned,
  sorted,
  filtered,
}: todoMenuProps) {
  const items = [
    {
      name: pinned ? "Unpin" : "Pin",
      Icon: BsPinAngleFill,
      onClick: handlePin,
      color: pinned ? "primary.main" : "action.main",
    },
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
      <MenuPopover>
        {items.map(({ name, Icon, onClick, color }) => (
          <MenuItem
            sx={{ color: color }}
            className="flex-center gap-3"
            key={name}
            onClick={onClick}>
            <ListItemIcon sx={{ color: color }}>
              <Icon />
            </ListItemIcon>
            <Box sx={{ color: color }} className="text-xl">
              {name}
            </Box>
          </MenuItem>
        ))}
      </MenuPopover>
    </div>
  );
}

export default TodoMenu;
