import FooterPopover from "@/components/footerPopover";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import AllSpaces from "../settings/spaces/allSpaces";
import { ScrollBar } from "@/components/scrollarea";
import { Root, Viewport } from "@radix-ui/react-scroll-area";

function Spaces() {
  const { space } = useCurrentIcons();
  return (
    <FooterPopover tooltip="Spaces" icon={space}>
      <Root className="overflow-hidden">
        <Viewport className="p-2 size-full max-h-96 relative">
          <AllSpaces headerProps={{ className: "text-lg my-0 py-0" }} />
        </Viewport>
        <ScrollBar />
      </Root>
    </FooterPopover>
  );
}

export default Spaces;
