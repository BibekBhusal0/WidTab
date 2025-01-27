import { AllSearchEngines } from "@/types/slice/widgets";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
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
  Perplexity: {
    icon: "ri:perplexity-line",
    link: "https://www.perplexity.ai/?q=%s",
  },
  ChatGPT: { icon: "ri:openai-fill", link: "https://chatgpt.com/?q=%s" },
};

export type SearchEngineSelectProps = {
  showName?: boolean;
} & Partial<TextFieldProps>;

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
    <TextField
      variant="filled"
      size="small"
      {...props}
      select
      className={cn("icon-xl", props.className)}
      slotProps={{
        select: {
          renderValue,
          MenuProps: { style: { maxHeight: "300px" } },
          disableUnderline: true,
        },
      }}
      sx={{
        ".MuiSelect-select": { padding: "5px" },
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
    </TextField>
  );
}

export default SearchEngineSelect;
