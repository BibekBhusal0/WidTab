import ThemeSettings from "./theme";
import ContainerSidebar from "@/components/containerSidebar";
import SpaceSettings from "./spaces";
import GeneralSettings from "./general";
import FooterPopover from "@/components/footerPopover";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function Settings() {
  const { settings } = useCurrentIcons();
  const allSettings = [
    { index: 0, name: "General", component: <GeneralSettings /> },
    { index: 1, name: "Theme", component: <ThemeSettings /> },
    { index: 2, name: "Spaces", component: <SpaceSettings /> },
  ];

  return (
    <FooterPopover tooltip="Settings" icon={settings}>
      <ContainerSidebar
        items={allSettings}
        mainProps={{ sx: { width: "600px", height: "500px" } }}
        tabsProps={{ sx: { width: "150px" } }}
      />
    </FooterPopover>
  );
}

export default Settings;
