import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { AllSearchEngines, SearchWidgetType } from "@/types/slice/widgets";
import {
  IconButton,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SiDuckduckgo,
  SiMicrosoftbing,
  SiYoutube,
  SiBrave,
  SiGoogle,
} from "react-icons/si";
import { IoSearch } from "react-icons/io5";
import { StateType } from "@/redux/store";
import { IconContext } from "react-icons/lib";
import SimpleWidget from "../simpleWidget";

export type SearchEngineMapping = Record<
  AllSearchEngines,
  { icon: ReactNode; link: string }
>;
const searchEngineLogoAndLink: SearchEngineMapping = {
  Google: { icon: <SiGoogle />, link: "https://www.google.com/search?q=%s" },
  Bing: { icon: <SiMicrosoftbing />, link: "https://www.bing.com/search?q=%s" },
  YouTube: {
    icon: <SiYoutube />,
    link: "https://www.youtube.com/results?search_query=%s",
  },
  DuckDuckGo: { icon: <SiDuckduckgo />, link: "https://duckduckgo.com/?q=%s" },
  Brave: {
    icon: <SiBrave />,
    link: "https://search.brave.com/search?q=%s",
  },
};

function SearchWidget({ id, engine }: SearchWidgetType) {
  const [text, setText] = useState("");
  const { linkInNewTab } = useSelector((state: StateType) => state.layout);

  const dispatch = useDispatch();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSearch = () => {
    if (text.trim().length !== 0) {
      const searchEngineLink = searchEngineLogoAndLink[engine].link;
      const searchUrl = searchEngineLink.replace(
        "%s",
        encodeURIComponent(text)
      );

      if (linkInNewTab) {
        window.open(searchUrl, "_blank");
      } else {
        window.location.href = searchUrl;
      }
    }
  };
  const changeSearchEngine = (e: SelectChangeEvent<AllSearchEngines>) => {
    if (e.target.value) {
      dispatch(
        currentSpaceEditWidget({
          type: "search",
          values: { id, engine: e.target.value as AllSearchEngines },
        })
      );
    }
  };

  const renderValue = (selected: AllSearchEngines) => {
    return (
      <ListItemIcon>{searchEngineLogoAndLink[selected].icon}</ListItemIcon>
    );
  };

  return (
    <SimpleWidget id={id} type="search">
      <IconContext.Provider value={{ size: "30px" }}>
        <OutlinedInput
          placeholder="Search..."
          autoFocus
          className="size-full"
          sx={{ fontSize: "32px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <IoSearch />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Select
                variant="filled"
                size="small"
                disableUnderline
                value={engine}
                onChange={changeSearchEngine}
                renderValue={renderValue}
                sx={{
                  ".MuiSelect-select": {
                    padding: "10px",
                    paddingBottom: "4px",
                  },
                }}>
                {Object.entries(searchEngineLogoAndLink).map(
                  ([key, { icon }]) => (
                    <MenuItem
                      className="gap-4"
                      key={key}
                      value={key as AllSearchEngines}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <span>{key}</span>
                    </MenuItem>
                  )
                )}
              </Select>
            </InputAdornment>
          }
          size="small"
          value={text}
          onChange={handleInputChange}
        />
      </IconContext.Provider>
    </SimpleWidget>
  );
}
export default SearchWidget;
