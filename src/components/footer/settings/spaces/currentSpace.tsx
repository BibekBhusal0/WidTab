import useCurrentLayout from "@/hooks/useCurrentLayout";
import { Box } from "@mui/material";
import Lock from "../../lock";
import SettingHeader from "../settings-header";
import DuplicateThisSpace from "./duplicateSpace";
import DeleteThisSpace from "./deleteSpace";
import ChangeCompaction from "./changeCompaction";

function CurrentSpaceSetting() {
  const layout = useCurrentLayout();
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
        <DuplicateThisSpace />
        <DeleteThisSpace />
      </Box>
    </>
  );
}

export default CurrentSpaceSetting;
