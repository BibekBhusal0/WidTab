import useCurrentLayout from "@/hooks/useCurrentLayout";
import { DeleteWidgetParameters } from "@/types/slice/widgets";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import WidgetControls from "@/components/widgetControl";
import { ReactNode } from "react";

type simpleWidgetProps = DeleteWidgetParameters & {
  children: ReactNode;
};

function SimpleWidget({ children, ...props }: simpleWidgetProps) {
  const layout = useCurrentLayout();
  const showControls = !layout?.locked;

  return (
    <Box className="size-full relative overflow-hidden">
      {showControls && <DeleteWidgetButton {...props} />}
      {children}
    </Box>
  );
}

export function DeleteWidgetButton(props: DeleteWidgetParameters) {
  const dispatch = useDispatch();
  return (
    <WidgetControls>
      <IconButton
        color="error"
        onClick={() => dispatch(currentSpaceDeleteWidget(props))}>
        <DeleteIcon />
      </IconButton>
    </WidgetControls>
  );
}

export default SimpleWidget;
