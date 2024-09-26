import AllDynamicSpace from "./allDynamicSpaces";
import AllStaticLayout from "./allStaticSpaces";
import SettingHeader from "../settings-header";

function AllSpaces() {
  return (
    <>
      <SettingHeader first className="text-xl mx-2">
        Dynamic Spaces
      </SettingHeader>
      <AllDynamicSpace />
      <SettingHeader className="text-xl mx-2">Static Spaces</SettingHeader>
      <AllStaticLayout />
    </>
  );
}

export default AllSpaces;
