import { cn } from "@/utils/cn";
import Box, { BoxProps } from "@mui/material/Box";
import { ReactNode, useState } from "react";

export type hoverControlsProps = {
  controls: ReactNode;
} & BoxProps;

function HoverControls({ controls, ...props }: hoverControlsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("size-full relative", props.className)}>
      {isHovered && controls}
      {props.children}
    </Box>
  );
}

export default HoverControls;
