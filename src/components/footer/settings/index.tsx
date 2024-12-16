import ThemeSettings from "./theme";
import ContainerSidebar, {
  SidebarComponent,
} from "@/components/containerSidebar";
import SpaceSettings from "./spaces";
import GeneralSettings from "./general";
import FooterPopover from "@/components/footerPopover";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { DataSettings } from "./data";

export const allSettings: SidebarComponent[] = [
  { index: 0, name: "General", component: <GeneralSettings /> },
  { index: 1, name: "Theme", component: <ThemeSettings /> },
  { index: 2, name: "Spaces", component: <SpaceSettings /> },
  { index: 3, name: "Data", component: <DataSettings /> }, //not working don't know why
];
function Settings() {
  const { settings } = useCurrentIcons();

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
