import { AllSearchEngines } from "@/types/slice/widgets";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";

export type SearchEngineMapping = Record<
  AllSearchEngines,
  { icon: string; link: string }
>;

export const searchEngineLogoAndLink: SearchEngineMapping = {
  Google: { icon: "cib:google", link: "https://www.google.com/search?q=%s" },
  Bing: { icon: "cib:bing", link: "https://www.bing.com/search?q=%s" },
  YouTube: {
    icon: "cib:youtube",
    link: "https://www.youtube.com/results?search_query=%s",
  },
  DuckDuckGo: { icon: "cib:duckduckgo", link: "https://duckduckgo.com/?q=%s" },
  Brave: { icon: "cib:brave", link: "https://search.brave.com/search?q=%s" },
};

export type SearchEngineSelectProps = {
  showName?: boolean;
} & Partial<SelectProps>;

function SearchEngineSelect({ showName, ...props }: SearchEngineSelectProps) {
  const renderValue = (selected: unknown) => {
    return (
      <div className={cn("flex-center p-1", { "gap-4 p-2": showName })}>
        <Icon
          icon={searchEngineLogoAndLink[selected as AllSearchEngines].icon}
        />
        {showName && (
          <div className="text-xl">{selected as AllSearchEngines}</div>
        )}
      </div>
    );
  };

  return (
    <Select
      variant="filled"
      size="small"
      disableUnderline
      {...props}
      renderValue={renderValue}
      className={cn("icon-xl", props.className)}
      sx={{
        ".MuiSelect-select": {
          padding: "10px",
          paddingBottom: "4px",
        },
        ...props.sx,
      }}>
      {Object.entries(searchEngineLogoAndLink).map(([key, { icon }]) => (
        <MenuItem
          className="gap-4 text-xl"
          key={key}
          value={key as AllSearchEngines}>
          <ListItemIcon className="icon-xl">
            <Icon icon={icon} />
          </ListItemIcon>
          <span>{key}</span>
        </MenuItem>
      ))}
    </Select>
  );
}

export default SearchEngineSelect;
