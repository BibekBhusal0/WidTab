import { ReactNode, useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { cn } from "@/lib/utils";
import {
  styled,
  Tab,
  TabProps,
  Tabs,
  TabsProps,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export type SidebarComponent = {
  index: number;
  name: ReactNode;
  component: ReactNode;
};
export type ContainerSidebarProps = {
  items: SidebarComponent[];
  mainProps?: BoxProps;
  tabsProps?: TabsProps;
  panelProps?: BoxProps;
  tabProps?: TabProps;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  fontWeight: theme.typography.fontWeightRegular,

  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    color: alpha(theme.palette.text.primary, 0.8),
  },
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function ContainerSidebar({
  items,
  mainProps = undefined,
  tabsProps = undefined,
  panelProps = undefined,
  tabProps = undefined,
}: ContainerSidebarProps) {
  const [value, setValue] = useState(items[0].index);
  const crrComponent =
    items.find((p) => p.index === value)?.component || items[0].component;
  const {
    palette: { divider },
  } = useTheme();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      {...mainProps}
      className={cn("flex h-full", mainProps?.className)}
      //
    >
      <Tabs
        TabIndicatorProps={{ style: { display: "none" } }}
        orientation="vertical"
        value={value}
        onChange={handleChange}
        {...tabsProps}
        sx={{ borderRight: `2px solid ${divider}`, ...tabsProps?.sx }}
        className={cn("h-full ", tabsProps?.className)}
        //
      >
        {items.map(({ name, index }) => (
          <CustomTab
            {...tabProps}
            {...a11yProps(index)}
            sx={tabProps?.sx}
            value={index}
            key={index}
            label={name}
            //
          />
        ))}
      </Tabs>
      <Box
        {...panelProps}
        className={cn(
          "border-l-3 p-4 overflow-y-auto h-full w-full",
          panelProps?.className
        )}>
        {crrComponent}
      </Box>
    </Box>
  );
}

export default ContainerSidebar;
