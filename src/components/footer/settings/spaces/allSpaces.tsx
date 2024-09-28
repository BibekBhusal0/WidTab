import AllDynamicSpace from "./allDynamicSpaces";
import AllStaticLayout from "./allStaticSpaces";
import SettingHeader from "../settings-header";
import { BoxProps } from "@mui/material";
import { cn } from "@/utils/cn";

function AllSpaces({ headerProps = undefined }: { headerProps?: BoxProps }) {
  return (
    <>
      <SettingHeader
        first
        {...headerProps}
        className={cn("text-xl mx-2", headerProps?.className)}>
        Dynamic Spaces
      </SettingHeader>
      <AllDynamicSpace />
      <SettingHeader
        {...headerProps}
        className={cn("text-xl mx-2", headerProps?.className)}>
        Static Spaces
      </SettingHeader>
      <AllStaticLayout />
    </>
  );
}

export default AllSpaces;
