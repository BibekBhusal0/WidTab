import { Box } from "@mui/material";
import Lock from "./lock";
import Settings from "./settings";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import AddWidget from "./addWidget";
import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { positionProps } from "@/types/slice/layout";
import { cn } from "@/utils/cn";

function Footer() {
  const l = useCurrentLayout();

  const { controlBarPosition } = useSelector(
    (state: StateType) => state.layout
  );
  const { footerProps } = positionProps[controlBarPosition];

  return (
    <Box
      {...footerProps}
      sx={{
        ...footerProps?.sx,
        backgroundColor: "secondaryContainer.paper",
      }}
      className={cn("size-full between bg-green-800", footerProps?.className)}
      //
    >
      <div className={cn("flex-center", footerProps?.className)}>
        <Settings />
        {l && <AddWidget />}
      </div>
      <div className={cn("flex-center", footerProps?.className)}>
        {l && <Lock />}
      </div>
    </Box>
  );
}

export default Footer;
