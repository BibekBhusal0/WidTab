import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Popover } from "@mui/material";
import { useState } from "react";
import ThemeSettings from "./theme";
import ContainerSidebar from "@/components/containerSidebar";
import { useTheme } from "@mui/material/styles";

const width = "600px";
const height = "500px";

function Settings() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleOpen} aria-label="settings">
        <SettingsIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        marginThreshold={30}
        open={open}
        onClose={handleClose}>
        <SettingsMenu />
      </Popover>
    </>
  );
}

function SettingsMenu() {
  const {
    palette: { divider },
  } = useTheme();
  const allSettings = [
    { index: 0, name: "Theme", component: <ThemeSettings /> },
    { index: 1, name: "Widgets", component: "Empty" },
  ];
  const w = "150px";
  return (
    <ContainerSidebar
      items={allSettings}
      mainProps={{ sx: { width, height } }}
      tabsProps={{ sx: { width: w, borderRight: `2px solid ${divider}` } }}
    />
  );
}

export default Settings;
