import AllSpaces from "./allSpaces";
import CurrentSpaceSetting from "./currentSpace";

function SpaceSettings() {
  return (
    <div className="size-full">
      <CurrentSpaceSetting />
      <AllSpaces />
    </div>
  );
}

export default SpaceSettings;
