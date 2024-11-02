import AllDynamicSpace from "./allDynamicSpaces";
import AllStaticLayout from "./allStaticSpaces";
import SettingHeader from "../settings-header";
import { BoxProps } from "@mui/material/Box";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import Divider from "@mui/material/Divider";
import AddSpace from "./addSpace";

function AllSpaces({ headerProps = undefined }: { headerProps?: BoxProps }) {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
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
      {currentSpace.type === "static" && (
        <>
          <Divider /> <AddSpace />
        </>
      )}
    </>
  );
}

export default AllSpaces;
