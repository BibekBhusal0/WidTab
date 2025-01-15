import { AllSearchEngines, searchEngines } from "@/types/slice/widgets";
import type { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import SearchEngineSelect from "@/layout/widgets/search/select";
import SimpleAddWidgetButton from "./simpleAddWidget";

function AddSearch() {
  const [engine, setEngine] = useState<AllSearchEngines>("Google");

  const changeSearchEngine = (e: SelectChangeEvent<unknown>) => {
    const val = e.target.value as AllSearchEngines;
    if (!searchEngines.includes(val)) return;
    if (e.target.value) setEngine(val);
  };

  return (
    <div className="flex-center flex-col w-full pt-4 gap-5">
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
      <SimpleAddWidgetButton
        widget={{ type: "search", values: { id: 0, engine } }}
      />
    </div>
  );
}

export default AddSearch;
