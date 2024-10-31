import Menu, { MenuProps } from "@mui/material/Menu";
import Box, { BoxProps } from "@mui/material/Box";
import { cn } from "@/utils/cn";
import { ReactNode, useState, MouseEvent } from "react";

export type contextMenuProps = {
  children?: ReactNode;
  menuProps?: Partial<MenuProps>;
  containerProps?: BoxProps;
  menuContent?: ReactNode;
  closeOnClick?: boolean;
};

export default function ContextMenu({
  menuProps,
  containerProps,
  menuContent,
  children,
  closeOnClick = true,
}: contextMenuProps) {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Box
      {...containerProps}
      onContextMenu={handleContextMenu}
      className={cn(
        "cursor-context-menu size-full",
        containerProps?.className
      )}>
      <Menu
        {...menuProps}
        open={contextMenu !== null}
        onClick={closeOnClick ? handleClose : undefined}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }>
        {menuContent}
      </Menu>
      {children}
    </Box>
  );
}
