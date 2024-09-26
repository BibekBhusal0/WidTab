import { cn } from "@/utils/cn";
import { Paper, PaperProps, useTheme } from "@mui/material";

function WidgetControls(props: PaperProps) {
  const {
    palette: {
      primaryContainer: { main },
    },
  } = useTheme();
  return (
    <Paper
      {...props}
      className={cn("absolute right-0 top-0 px-2 py-1 z-30", props?.className)}
      sx={{
        borderRadius: 0,
        borderBottomLeftRadius: 4,
        background: main,
        ...props?.sx,
      }}
      //
    />
  );
}

export default WidgetControls;
