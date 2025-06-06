import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import Box, { BoxProps } from "@mui/material/Box";
import { cn } from "@/utils/cn";

export type SidebarProps = {
  resizableBoxProps?: Partial<ResizableBoxProps>;
  containerProps?: BoxProps;
  contentContainerProps?: BoxProps;
  headerProps?: BoxProps;
  showButton?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Sidebar({
  resizableBoxProps,
  headerProps,
  showButton,
  header,
  children,
  contentContainerProps,
  containerProps,
}: SidebarProps) {
  const [drawerWidth, setDrawerWidth] = useState(600);
  const minW = 200;
  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    if (!open && drawerWidth <= minW) setDrawerWidth(minW);
    setOpen(!open);
  };

  return (
    <Box {...containerProps} className={cn("sidebar flex size-full", containerProps?.className)}>
      <ResizableBox
        width={open ? drawerWidth : 0}
        height={Infinity}
        minConstraints={[0, 0]}
        maxConstraints={[600, Infinity]}
        axis="x"
        resizeHandles={["e"]}
        onResize={(e: any, { size }) => {
          setDrawerWidth(size.width);
          setOpen(size.width > minW ? true : e.movementX > 0);
        }}
        {...resizableBoxProps}
        className={cn(
          `relative h-full overflow-x-hidden overflow-y-auto text-ellipsis`,
          { "transition-all": !open },
          resizableBoxProps?.className
        )}
      />
      <Box
        {...contentContainerProps}
        className={cn(
          "flex w-full flex-col gap-4 transition-all",
          contentContainerProps?.className
        )}>
        <Box
          {...headerProps}
          className={cn(
            "relative flex w-full items-center justify-between gap-4 p-4",
            headerProps?.className
          )}>
          {showButton && (
            <IconButton onClick={toggleOpen}>
              <Icon
                icon={open ? "material-symbols:menu-open-rounded" : "material-symbols:menu-rounded"}
              />
            </IconButton>
          )}
          {header}
        </Box>
        {children}
      </Box>
    </Box>
  );
}
