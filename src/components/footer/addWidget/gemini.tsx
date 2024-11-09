import { aiModel, AImodels } from "@/types/slice/widgets";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import SimpleAddWidgetButton from "./simpleAddWidget";
import SelectModel from "@/layout/widgets/gemini/select";
import { Icon2RN } from "@/theme/icons";

function AddGemini() {
  const [model, setModel] = useState<aiModel>("gemini-1.5-flash");

  const handleModelChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value as aiModel;
    if (AImodels.includes(val)) setModel(val);
  };

  return (
    <div className="flex-center flex-col size-full gap-5">
      <SelectModel value={model} onChange={handleModelChange} />
      <SimpleAddWidgetButton
        buttonProps={{ startIcon: <Icon2RN icon="ri:gemini-fill" /> }}
        widget={{ type: "gemini", values: { id: 0, model, conversation: [] } }}
      />
    </div>
  );
}

export default AddGemini;
