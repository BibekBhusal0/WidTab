import { Icon, listIcons } from "@iconify/react";
import { useEffect, useState } from "react";
import type { IconifyInfo, IconifyJSON } from "@iconify/types";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import MenuPopover, { MenuPopoverProps } from "./popoverMenu";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { Icon2RN } from "@/theme/icons";

const getIcons = async (mode: "Loaded" | string, searchTerm = ""): Promise<string[]> => {
  if (mode === "Loaded") {
    const icons = listIcons();
    return icons;
  } else if (mode === "Search") {
    if (!searchTerm || searchTerm.trim() === "") return [];
    try {
      const response = await fetch(
        `https://api.iconify.design/search?query=${searchTerm}&limit=999`
      );
      if (!response.ok || !response || response.status !== 200) return [];

      const data: APISearchResponse = await response.json();
      return data.icons;
    } catch (error) {
      return [];
    }
  } else {
    try {
      const response = await fetch(`https://api.iconify.design/collection?prefix=${mode}`);

      if (!response.ok || !response || response.status !== 200) return [];

      const data: APIv2CollectionResponse = await response.json();
      if (!data) return [];
      const formattedIcons: string[] = [];

      if (data.categories) {
        for (const category in data.categories) {
          formattedIcons.push(
            ...data.categories[category].map((iconName) => `${data.prefix}:${iconName}`)
          );
        }
      }
      if (data.uncategorized) {
        formattedIcons.push(...data.uncategorized.map((iconName) => `${data.prefix}:${iconName}`));
      }
      if (data.hidden) {
        formattedIcons.push(...data.hidden.map((iconName) => `${data.prefix}:${iconName}`));
      }

      return formattedIcons;
    } catch (error) {
      return [];
    }
  }
};

const SelectIcon = ({
  icon,
  setIcon,
  children,
}: SelectIconProps & { children?: React.ReactNode }) => {
  console.log(children);
  const [currentMode, setCurrentMode] = useState("Loaded");
  const [selected, setSelected] = useState(icon);
  const [iconsList, setIconsList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deferredSearchTerm, setDeferredSearchTerm] = useState(searchTerm);
  const { search } = useCurrentIcons();

  useEffect(() => {
    async function fetchIcons() {
      const icons = await getIcons(currentMode, deferredSearchTerm);
      if (Array.isArray(icons)) setIconsList(icons);
    }
    fetchIcons();
  }, [currentMode, deferredSearchTerm]);

  return (
    <div className="flex size-full flex-col items-center gap-3">
      <SelectIconType currentMode={currentMode} setCurrentMode={setCurrentMode} />
      {currentMode === "Search" && (
        <OutlinedInput
          autoFocus
          sx={{ paddingRight: "0", width: "200px" }}
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Icon"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setDeferredSearchTerm(searchTerm)}>
                <Icon2RN icon={search} />
              </IconButton>
            </InputAdornment>
          }
        />
      )}
      <IconsGrid
        {...{
          iconsList,
          selected,
          setSelected,
        }}
      />
      <Button variant="contained" onClick={() => setIcon(selected)}>
        Change
      </Button>
      {children}
    </div>
  );
};

export const SelectIconMenu = ({
  icon,
  setIcon,
  children,
  buttonProps,
  ...props
}: SelectIconMenuProps) => {
  return (
    <MenuPopover
      key={icon}
      icon={icon}
      {...props}
      buttonProps={{
        ...buttonProps,
        sx: { p: 0.5, m: 0, flexGrow: 0, ...buttonProps?.sx },
      }}
      menuProps={{
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "bottom", horizontal: "left" },
        ...props.menuProps,
      }}>
      <SelectIcon {...{ icon, setIcon, children }} />
    </MenuPopover>
  );
};

export function IconsGrid({ iconsList, selected, setSelected }: IconGridProps) {
  const columnCount = 5;
  const width = 40;

  return (
    <Grid
      columnCount={columnCount}
      rowCount={Math.ceil(iconsList.length / columnCount)}
      columnWidth={width}
      rowHeight={width}
      height={300}
      width={columnCount * width + 20}>
      {({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
        const iconIndex = rowIndex * columnCount + columnIndex;
        const icon = iconsList[iconIndex];
        if (!icon) return null;

        return (
          <div
            className={cn("hover:bg-primary-6 p-2", {
              "bg-primary-selected": selected === icon,
            })}
            onClick={() => setSelected(icon)}
            style={{
              ...style,
            }}>
            <Icon className="size-full" icon={icon} />
          </div>
        );
      }}
    </Grid>
  );
}

function SelectIconType({
  currentMode,
  setCurrentMode,
}: {
  currentMode: string;
  setCurrentMode: (mode: string) => void;
}) {
  const height = "30px";
  const sx = { padding: "5px", minHeight: "0px", minWidth: "70px" };
  const tabs = [
    { value: "Loaded", label: "Loaded" },
    { value: "Search", label: "Search" },
    { value: "noto", label: "Emoji" },
  ];
  return (
    <Tabs
      value={currentMode}
      sx={{
        "& .MuiTabs-indicator": {
          height: "100%",
          opacity: 0.3,
          zIndex: -1,
          borderTop: "var(--custom-border-radius)",
        },
        minHeight: height,
        height,
      }}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") setCurrentMode(newValue);
      }}>
      {tabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} sx={sx} />
      ))}
    </Tabs>
  );
}

export type SelectIconMenuProps = SelectIconProps & Partial<MenuPopoverProps>;
export interface SelectIconProps {
  icon: string;
  setIcon: (icon: string) => void;
}
interface IconGridProps {
  iconsList: string[];
  selected: string;
  setSelected: (icon: string) => void;
}
export interface APIv2CollectionResponse {
  prefix: string;
  total: number;
  title?: string;
  info?: IconifyInfo;
  uncategorized?: string[];
  categories?: Record<string, string[]>;
  hidden?: string[];
  aliases?: Record<string, string>;
  chars?: Record<string, string>;
  themes?: IconifyJSON["themes"];
  prefixes?: IconifyJSON["prefixes"];
  suffixes?: IconifyJSON["suffixes"];
}
export interface APISearchResponse {
  icons: string[];
}
export default SelectIcon;
