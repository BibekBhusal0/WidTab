import useCurrentLayout from "@/hooks/useCurrentLayout";
import Box from "@mui/material/Box";
import Lock from "../../lock";
import SettingHeader from "../settings-header";
import DuplicateThisSpace from "./duplicateSpace";
import DeleteThisSpace from "./deleteSpace";
import ChangeCompaction from "./changeCompaction";
import AddSpace from "./addSpace";
import RenameItem from "@/components/renameItem";
import { useDispatch } from "react-redux";
import { currentSpaceRename } from "@/redux/slice/layout";

function CurrentSpaceSetting() {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  if (!layout) return null;

  return (
    <>
      <SettingHeader>Current Space</SettingHeader>
      <Box className="w-full flex flex-col items-center gap-5">
        <ChangeCompaction />
        <div className="between gap-4 w-full">
          <div className="text-xl">Lock Widgets</div>
          <Lock type="toggle" />
        </div>

        <div className="between gap-4 w-full">
          <div className="text-xl">Rename Space</div>
          <RenameItem
            initialText={layout.name}
            handleChange={(e: string) => {
              dispatch(currentSpaceRename(e));
            }}
            inputProps={{ placeholder: "Rename Space" }}
            wordLimit={20}
          />
        </div>

        <DuplicateThisSpace />
        <DeleteThisSpace />
        <AddSpace />
      </Box>
    </>
  );
}

export default CurrentSpaceSetting;
