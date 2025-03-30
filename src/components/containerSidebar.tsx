import { ReactNode, useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { cn } from "@/utils/cn";
import Tab, { TabProps } from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import alphaColor from "@/utils/alpha";
import { ScrollArea } from "./scrollarea";

export type SidebarComponent = {
  index: number;
  name: ReactNode;
  component: ReactNode;
};
export type ContainerSidebarProps = {
  items: SidebarComponent[];
  mainProps?: Partial<BoxProps>;
  tabsProps?: Partial<TabsProps>;
  panelProps?: JSX.IntrinsicElements["div"];
  tabProps?: Partial<TabProps>;
};

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: alphaColor(theme.palette.primary.main, 0.1),
  fontWeight: theme.typography.fontWeightRegular,

  "&:hover": {
    backgroundColor: alphaColor(theme.palette.primary.main, 0.2),
    color: alphaColor(theme.palette.text.primary, 0.8),
  },
  "&.Mui-selected": {
    backgroundColor: alphaColor(theme.palette.primary.main, 0.1),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    width: "100%",
    opacity: 0.5,
    zIndex: -1,
  },
});

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
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      {...mainProps}
      className={cn("flex h-full relative", mainProps?.className)}>
      <CustomTabs
        orientation="vertical"
        scrollButtons="auto"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        {...tabsProps}
        className={cn(
          "h-full border-r-2 border-r-divider",
          tabsProps?.className
        )}
      //
      >
        {items.map(({ name, index }) => (
          <CustomTab
            {...tabProps}
            {...a11yProps(index)}
            value={index}
            key={index}
            label={name}
          //
          />
        ))}
      </CustomTabs>

      <ScrollArea
        className="size-full"
        viewPortProps={{
          ...panelProps,
          children: null,
          className: cn(
            "border-l-1 p-2 px-4 size-full relative",
            panelProps?.className
          ),
        }}
        children={crrComponent}
      />
      {/* </ScrollArea> */}

    </Box>
  );
}

export default ContainerSidebar;
