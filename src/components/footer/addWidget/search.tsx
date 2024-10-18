import useAvailablePosition from "@/hooks/useAvailablePosition";
import { searchEngineLogoAndLink } from "@/layout/widgets/search";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { AllSearchEngines } from "@/types/slice/widgets";
import { widgetDimensions } from "@/utils/getWidget";
import Button from "@mui/material/Button";
import type { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useState } from "react";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";

function AddSearch() {
  const dispatch = useDispatch();
  const dimensions = widgetDimensions["search"];
  const { minH, minW } = dimensions;
  const [engine, setEngine] = useState<AllSearchEngines>("Google");
  const availablePosition = useAvailablePosition(minW, minH);
  const changeSearchEngine = (e: SelectChangeEvent<AllSearchEngines>) => {
    if (e.target.value) {
      setEngine(e.target.value as AllSearchEngines);
    }
  };

  const add = () => {
    if (availablePosition) {
      dispatch(
        currentSpaceAddWidget({
          type: "search",
          gridProps: { ...dimensions, ...availablePosition },
          values: { id: 0, engine },
        })
      );
    }
  };

  const renderValue = (selected: AllSearchEngines) => {
    return (
      <div className="flex-center gap-4 p-2">
        {searchEngineLogoAndLink[selected].icon}
        <div className="text-xl">{selected}</div>
      </div>
    );
  };

  return (
    <div className="flex-center flex-col size-full gap-5">
      <IconContext.Provider value={{ size: "30px" }}>
        <FormControl fullWidth>
          <InputLabel id="search-engines">Search Engine</InputLabel>

          <Select
            labelId="search-engines"
            label="Search Engine"
            placeholder="Search Engine"
            size="small"
            value={engine}
            onChange={changeSearchEngine}
            disableUnderline
            renderValue={renderValue}
            //
          >
            {Object.entries(searchEngineLogoAndLink).map(([key, { icon }]) => (
              <MenuItem
                className="gap-4"
                key={key}
                value={key as AllSearchEngines}>
                <ListItemIcon>{icon}</ListItemIcon>
                <span>{key}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </IconContext.Provider>
      <Button
        variant="contained"
        disabled={availablePosition === null}
        onClick={add}>
        Add Search Widget
      </Button>
    </div>
  );
}

export default AddSearch;
