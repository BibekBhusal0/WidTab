import { IoPlanetOutline } from "react-icons/io5";
import FooterPopover from "../footerPopover";
import AllSpaces from "./settings/spaces/allSpaces";

function Spaces() {
  return (
    <FooterPopover tooltip="Spaces" icon={<IoPlanetOutline />}>
      <div className="p-2">
        <AllSpaces headerProps={{ className: "text-lg my-0 py-0" }} />
      </div>
    </FooterPopover>
  );
}

export default Spaces;
