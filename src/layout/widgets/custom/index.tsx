import useCurrentLayout from "@/hooks/useCurrentLayout";
import { CustomWidgetType } from "@/types/slice/widgets";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";

function CustomWidget({ url, id }: CustomWidgetType) {
  const layout = useCurrentLayout();
  const showControls = !layout?.locked;

  return (
    <Box className="size-full relative">
      {showControls && <CustomWidgetControls id={id} />}
      <iframe src={url} className="size-full" />
    </Box>
  );
}

function CustomWidgetControls({ id }: { id: number }) {
  const dispatch = useDispatch();
  return (
    <Box className="absolute right-0 top-0 p-3">
      <IconButton onClick={() => dispatch(currentSpaceDeleteWidget(id))}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default CustomWidget;
