import { Box } from "@mui/material";
import useCurrentRoundness from "@/hooks/useCurrentRoundness";

function DragHandle() {
  const borderRadius = useCurrentRoundness();

  return (
    <Box
      className="absolute w-full h-[50%] overflow-hidden top-0 left-0 z-10"
      sx={{ borderRadius }}
      //
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
        }}
        className="w-full opacity-50 drag-handle h-[9%] absolute top-0 left-0"></Box>
    </Box>
  );
}

export default DragHandle;
