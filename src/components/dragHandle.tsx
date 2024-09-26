import { Box } from "@mui/material";
import useCurrentRoundness from "@/hooks/useCurrentRoundness";

function DragHandle() {
  const borderRadius = useCurrentRoundness();

  return (
    <Box
      className="size-full absolute overflow-hidden top-0 left-0"
      sx={{ borderRadius }}
      //
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
        }}
        className="w-full opacity-50 drag-handle h-[9%] absolute top-0 left-0 z-20"></Box>
    </Box>
  );
}

export default DragHandle;
