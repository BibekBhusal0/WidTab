import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { AllSearchEngines, SearchWidgetType } from "@/types/slice/widgets";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SelectChangeEvent } from "@mui/material/Select";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import SimpleWidget from "../simpleWidget";
import SearchEngineSelect, { searchEngineLogoAndLink } from "./select";
import { Icon } from "@iconify/react";

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
  const changeSearchEngine = (e: SelectChangeEvent<unknown>) => {
    if (e.target.value) {
      dispatch(
        currentSpaceEditWidget({
          type: "search",
          values: { id, engine: e.target.value as AllSearchEngines },
        })
      );
    }
  };

  return (
    <SimpleWidget id={id} type="search">
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
            <IconButton className="icon-2xl" onClick={handleSearch}>
              <Icon icon="material-symbols:search" />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <SearchEngineSelect value={engine} onChange={changeSearchEngine} />
          </InputAdornment>
        }
        size="small"
        value={text}
        onChange={handleInputChange}
      />
    </SimpleWidget>
  );
}
export default SearchWidget;
