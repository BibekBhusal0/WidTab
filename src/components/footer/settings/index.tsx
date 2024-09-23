import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  IconButton,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import ThemeSettings from "./theme";

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
  const allSettings = [
    { index: 0, name: "Theme", component: <ThemeSettings /> },
    { index: 1, name: "Widgets", component: "click me" },
  ];
  const [value, setValue] = useState(0);
  const crrComponent =
    allSettings.find((p) => p.index === value)?.component ||
    allSettings[0].component;

  const w = "150px";
  return (
    <Box className="flex h-full" sx={{ width, height }}>
      <Box className="h-full" sx={{ borderRight: 1, width: w }}>
        <ToggleButtonGroup
          orientation="vertical"
          value={value}
          onChange={(_, newValue) => {
            if (newValue !== null) {
              setValue(newValue);
            }
          }}
          exclusive>
          {allSettings.map(({ name, index }) => (
            <ToggleButton
              color="primary"
              value={index}
              key={index}
              sx={{
                width: w,
                borderRadius: 0,
                borderRight: "none",
                borderLeft: "none",
              }}>
              {name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <div className="border-r-3 p-4 overflow-auto h-full">{crrComponent}</div>
    </Box>
  );
}

export default Settings;
