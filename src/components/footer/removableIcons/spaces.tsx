import FooterPopover from "@/components/footerPopover";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { Navigation } from "@/layout/widgets/navigation/widget";

function Spaces() {
  const { space } = useCurrentIcons();
  return (
    <FooterPopover tooltip="Spaces" icon={space}>
      <Navigation className="max-h-96" />
    </FooterPopover>
  );
}

export default Spaces;
