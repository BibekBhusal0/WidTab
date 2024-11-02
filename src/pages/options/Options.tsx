import ContainerSidebar from "@/components/containerSidebar";
import { allSettings } from "@/components/footer/settings";

function Options() {
  return (
    <ContainerSidebar
      items={allSettings}
      mainProps={{ sx: { width: "100%", height: "100%" } }}
      tabsProps={{ sx: { width: "200px" } }}
    />
  );
}

export default Options;
