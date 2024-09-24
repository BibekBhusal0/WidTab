import { Box } from "@mui/material";
import Lock from "./lock";
import Settings from "./settings";

function Footer({ height }: { height: number }) {
  return (
    <Box
      sx={{
        borderTop: "1px solid",
      }}
      style={{ height: `${height}%` }}
      className="size-full between ">
      <div className="flex-center">
        <Settings />
      </div>
      <div className="flex-center">
        <Lock />
      </div>
    </Box>
  );
}

export default Footer;
