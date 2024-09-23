import { ReactNode, useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import { cn } from "@/lib/utils";

export type SidebarComponent = {
  index: number;
  name: ReactNode;
  component: ReactNode;
};
export type ContainerSidebarProps = {
  items: SidebarComponent[];
  mainProps?: BoxProps;
  tabsProps?: ToggleButtonGroupProps;
  panelProps?: BoxProps;
  buttonProps?: ToggleButtonProps;
};

function ContainerSidebar({
  items,
  mainProps = undefined,
  tabsProps = undefined,
  panelProps = undefined,
  buttonProps = undefined,
}: ContainerSidebarProps) {
  const [value, setValue] = useState(items[0].index);
  const crrComponent =
    items.find((p) => p.index === value)?.component || items[0].component;

  return (
    <Box
      {...mainProps}
      className={cn("flex h-full", mainProps?.className)}
      //
    >
      <ToggleButtonGroup
        orientation="vertical"
        {...tabsProps}
        value={value}
        onChange={(_, newValue) => {
          if (newValue !== null) {
            setValue(newValue);
          }
        }}
        exclusive
        className={cn("h-full ", tabsProps?.className)}
        //
      >
        {items.map(({ name, index }) => (
          <ToggleButton
            color="primary"
            sx={{
              borderRadius: 0,
              borderLeft: "none",
              borderRight: "none",
            }}
            {...buttonProps}
            value={index}
            key={index}
            //
          >
            {name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Box
        {...panelProps}
        className={cn(
          "border-l-3 p-4 overflow-y-auto h-full w-full"
          //   panelProps?.className
        )}>
        {crrComponent}
      </Box>
    </Box>
  );
}

export default ContainerSidebar;
