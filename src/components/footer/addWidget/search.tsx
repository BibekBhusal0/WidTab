import { AllSearchEngines, searchEngines } from "@/types/slice/widgets";
import { useState } from "react";
import SearchEngineSelect from "@/layout/widgets/search/select";
import SimpleAddWidgetButton from "./simpleAddWidget";

function AddSearch() {
  const [engine, setEngine] = useState<AllSearchEngines>("Google");

  const changeSearchEngine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as AllSearchEngines;
    if (!searchEngines.includes(val)) return;
    if (e.target.value) setEngine(val);
  };

  return (
    <div className="flex-center size-full flex-col gap-5 pt-4">
      <SearchEngineSelect
        showName
        sx={{ width: "80%" }}
        variant="outlined"
        label="Search Engine"
        value={engine}
        onChange={changeSearchEngine}
      />
      <SimpleAddWidgetButton widget={{ type: "search", values: { id: 0, engine } }} />
    </div>
  );
}

export default AddSearch;
