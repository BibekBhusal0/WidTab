import SettingHeader from "../settings-header";
import AllSpaces from "./allSpaces";
import CurrentSpaceSetting from "./currentSpace";

function SpaceSettings() {
  return (
    <>
      <SettingHeader first>Spaces</SettingHeader>
      <AllSpaces />
      <CurrentSpaceSetting />
    </>
  );
}

export default SpaceSettings;
