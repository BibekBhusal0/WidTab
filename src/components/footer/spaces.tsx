import useCurrentIcons from "@/hooks/useCurrentIcons";
import FooterPopover from "../footerPopover";
import AllSpaces from "./settings/spaces/allSpaces";

function Spaces() {
  const { space } = useCurrentIcons();
  return (
    <FooterPopover tooltip="Spaces" icon={space}>
      <div className="p-2">
        <AllSpaces headerProps={{ className: "text-lg my-0 py-0" }} />
      </div>
    </FooterPopover>
  );
}

export default Spaces;
