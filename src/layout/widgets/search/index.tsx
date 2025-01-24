import { currentSpaceEditWidget } from "@/redux/slice/layout";
import {
  AllSearchEngines,
  searchEngines,
  SearchWidgetType,
} from "@/types/slice/widgets";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import SearchEngineSelect, { searchEngineLogoAndLink } from "./select";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { openLink } from "@/utils/bookmark";

function SearchWidget({ id, engine }: SearchWidgetType) {
  const [text, setText] = useState("");
  const { linkInNewTab } = useSelector((state: StateType) => state.bookmarks);

  const { search } = useCurrentIcons();
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
      openLink(searchUrl, linkInNewTab);
    }
  };

  const changeSearchEngine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as AllSearchEngines;
    if (!searchEngines.includes(val)) return;
    dispatch(
      currentSpaceEditWidget({ type: "search", values: { id, engine: val } })
    );
  };

  return (
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
      endAdornment={
        <InputAdornment position="end">
          <IconButton className="icon-2xl" onClick={handleSearch}>
            {search}
          </IconButton>
        </InputAdornment>
      }
      startAdornment={
        <InputAdornment position="start">
          <SearchEngineSelect value={engine} onChange={changeSearchEngine} />
        </InputAdornment>
      }
      size="small"
      value={text}
      onChange={handleInputChange}
    />
  );
}
export default SearchWidget;
