import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Popover } from "@mui/material";
import { useState } from "react";
import ThemeSettings from "./theme";
import ContainerSidebar from "@/components/containerSidebar";
import SpaceSettings from "./spaces";

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
  const allSettings = [
    { index: 0, name: "Theme", component: <ThemeSettings /> },
    { index: 1, name: "Spaces", component: <SpaceSettings /> },
  ];

  return (
    <ContainerSidebar
      items={allSettings}
      mainProps={{ sx: { width: "600px", height: "500px" } }}
      tabsProps={{ sx: { width: "150px" } }}
    />
  );
}

export default Settings;
