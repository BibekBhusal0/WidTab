import FooterPopover from "@/components/footerPopover";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import AllSpaces from "../settings/spaces/allSpaces";

function Spaces() {
  const { space } = useCurrentIcons();
  return (
    <FooterPopover tooltip="Spaces" icon={space}>
      <div className="p-2 max-h-96 overflow-y-auto">
        <AllSpaces headerProps={{ className: "text-lg my-0 py-0" }} />
      </div>
    </FooterPopover>
  );
}

export default Spaces;
