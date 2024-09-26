import { Box } from "@mui/material";
import Lock from "./lock";
import Settings from "./settings";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import AddWidget from "./addWidget";

function Footer({ height }: { height: number }) {
  const l = useCurrentLayout();
  return (
    <Box
      sx={{
        borderTop: "1px solid",
      }}
      style={{ height: `${height}%` }}
      className="size-full between"
      //
    >
      <div className="flex-center">
        <Settings />
        {l && <AddWidget />}
      </div>
      <div className="flex-center">
        <Lock />
      </div>
    </Box>
  );
}

export default Footer;
