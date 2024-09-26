import useCurrentLayout from "@/hooks/useCurrentLayout";
import { CustomWidgetType } from "@/types/slice/widgets";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import WidgetControls from "@/components/widgetControl";
import useCurrentRoundness from "@/hooks/useCurrentRoundness";

function CustomWidget({ url, id }: CustomWidgetType) {
  const layout = useCurrentLayout();
  const borderRadius = useCurrentRoundness();
  const showControls = !layout?.locked;

  return (
    <Box className="size-full relative overflow-hidden">
      {showControls && <CustomWidgetControls id={id} />}
      <iframe style={{ borderRadius }} src={url} className="size-full" />
    </Box>
  );
}

function CustomWidgetControls({ id }: { id: number }) {
  const dispatch = useDispatch();
  return (
    <WidgetControls>
      <IconButton
        color="error"
        onClick={() => dispatch(currentSpaceDeleteWidget(id))}>
        <DeleteIcon />
      </IconButton>
    </WidgetControls>
  );
}

export default CustomWidget;
