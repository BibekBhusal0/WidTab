import Box from "@mui/material/Box";
import Settings from "./settings";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import AddWidget from "./addWidget";
import { positionProps } from "@/types/slice/layout";
import { cn } from "@/utils/cn";
import RemovableButtons from "./removableIcons";
import { ToolbarDock } from "./dock";
import { useLayout } from "@/storage/";

function Footer() {
  const l = useCurrentLayout();
  const { toolBarPosition, dock } = useLayout();
  const { footerProps } = positionProps[toolBarPosition];

  return (
    <Box
      {...footerProps}
      sx={{ ...footerProps?.sx }}
      className={cn("full-between", footerProps?.className)}
      //
    >
      <div className={cn("flex-center gap-1", footerProps?.className)}>
        <Settings />
        {l && <AddWidget />}
      </div>
      {dock && <ToolbarDock />}
      <div className={cn("flex-center gap-1", footerProps?.className)}>
        <RemovableButtons />
      </div>
    </Box>
  );
}

export default Footer;
