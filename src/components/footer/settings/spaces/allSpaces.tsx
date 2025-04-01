import AllDynamicSpace from "./allDynamicSpaces";
import AllStaticLayout from "./allStaticSpaces";
import SettingHeader from "../settings-header";
import { BoxProps } from "@mui/material/Box";
import { cn } from "@/utils/cn";

function AllSpaces({ headerProps = undefined }: { headerProps?: BoxProps }) {
  return (
    <>
      <SettingHeader first {...headerProps} className={cn("mx-2 text-xl", headerProps?.className)}>
        Dynamic Spaces
      </SettingHeader>
      <AllDynamicSpace />
      <SettingHeader {...headerProps} className={cn("mx-2 text-xl", headerProps?.className)}>
        Static Spaces
      </SettingHeader>
      <AllStaticLayout />
    </>
  );
}

export default AllSpaces;
