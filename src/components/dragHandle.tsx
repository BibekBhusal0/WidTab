import { Box } from "@mui/material";
import useCurrentRoundness from "@/hooks/useCurrentRoundness";

function DragHandle() {
  const borderRadius = useCurrentRoundness();

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      }}
      className="w-full opacity-50 drag-handle h-[9%] absolute top-0 left-0 z-10"></Box>
  );
}

export default DragHandle;
