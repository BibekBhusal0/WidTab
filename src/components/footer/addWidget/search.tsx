import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { AllSearchEngines } from "@/types/slice/widgets";
import { widgetDimensions } from "@/utils/getWidget";
import Button from "@mui/material/Button";
import type { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SearchEngineSelect from "@/layout/widgets/search/select";

function AddSearch() {
  const dispatch = useDispatch();
  const dimensions = widgetDimensions["search"];
  const { minH, minW } = dimensions;
  const [engine, setEngine] = useState<AllSearchEngines>("Google");
  const availablePosition = useAvailablePosition(minW, minH);
  const changeSearchEngine = (e: SelectChangeEvent<unknown>) => {
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

  return (
    <div className="flex-center flex-col size-full gap-5">
      <FormControl fullWidth>
        <InputLabel id="search-engines">Search Engine</InputLabel>
        <SearchEngineSelect
          showName
          labelId="search-engines"
          label="Search Engine"
          placeholder="Search Engine"
          value={engine}
          onChange={changeSearchEngine}
        />
      </FormControl>
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
