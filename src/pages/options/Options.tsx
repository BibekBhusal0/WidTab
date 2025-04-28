import ContainerSidebar from "@/components/containerSidebar";
import { allSettings } from "@/components/footer/settings";
import { useFavicon } from "@/utils/faviconURL";

function Options() {
  useFavicon();
  return (
    <ContainerSidebar
      items={allSettings}
      mainProps={{ sx: { width: "100vw", height: "100vh" } }}
      tabsProps={{ sx: { width: "200px" } }}
    />
  );
}

export default Options;
