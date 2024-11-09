import MenuPopover from "@/components/popoverMenu";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/redux/slice/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { SelectChangeEvent } from "@mui/material/Select";
import IconMenu from "@/components/menuWithIcon";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import SelectModel from "./select";
import { aiModel, AImodels } from "@/types/slice/widgets";
import { setAPIKey } from "@/utils/api";

function GeminiControls({ id }: { id: number }) {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  const { delete_, reset } = useCurrentIcons();
  if (!layout) return null;
  const { widgets } = layout;
  const widget = widgets.find((w) => w.type === "gemini" && w.values.id === id);
  if (!widget || widget.type !== "gemini") return null;
  const props = widget.values;
  const { model } = props;

  const HandleModelChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value as aiModel;
    if (AImodels.includes(val)) {
      dispatch(
        currentSpaceEditWidget({
          type: "gemini",
          values: { ...props, model: val },
        })
      );
    }
  };

  const deleteThis = () =>
    dispatch(currentSpaceDeleteWidget({ type: "gemini", id }));

  const menuItems = [
    {
      icon: "ant-design:clear-outlined",
      name: "Clear History",
      onClick: () => {
        dispatch(
          currentSpaceEditWidget({
            type: "gemini",
            values: { ...props, conversation: [] },
          })
        );
      },
      color: "error.main",
    },
    {
      icon: reset,
      name: "Remove API Key",
      onClick: () => {
        setAPIKey("gemini", undefined);
      },
      color: "error.main",
    },
    {
      icon: delete_,
      name: "Delete",
      onClick: deleteThis,
      color: "error.main",
    },
  ];

  return (
    <MenuPopover>
      <div className="w-full p-2">
        <SelectModel value={model} onChange={HandleModelChange} />
      </div>
      <Divider />
      <IconMenu menuItems={menuItems} />
    </MenuPopover>
  );
}

export default GeminiControls;
