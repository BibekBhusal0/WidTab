import useCurrentLayout from "@/hooks/useCurrentLayout";
import { DeleteWidgetParameters } from "@/types/slice/widgets";
import { cn } from "@/utils/cn";
import Box, { BoxProps } from "@mui/material/Box";
import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper, { PaperProps } from "@mui/material/Paper";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import IconButton from "@mui/material/IconButton";
import { StateType } from "@/redux/store";

export type ControlsProps = {
  widgetInfo?: DeleteWidgetParameters;
  controls?: ReactNode;
  controlsContainerProps?: PaperProps;
  deleteButton?: boolean;
  showOn?: null | "hover" | "always";
} & BoxProps;

function Controls({
  controls = null,
  widgetInfo,
  controlsContainerProps = {},
  deleteButton = true,
  showOn = null,
  ...props
}: ControlsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { locked } = useSelector((state: StateType) => state.layout);
  const show =
    showOn === "always" || (showOn === "hover" && isHovered) || !locked;
  const handleMouseIn = () => {
    if (showOn === "hover") setIsHovered(true);
  };
  const handleMouseOut = () => {
    if (showOn === "hover") setIsHovered(false);
  };

  return (
    <Box
      {...props}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      className={cn("size-full relative", props.className)}>
      {show && (
        <Paper
          {...controlsContainerProps}
          className={cn(
            "absolute right-0 top-0 px-2 py-1 z-20 widget-control icon-lg flex-center",
            controlsContainerProps?.className
          )}
          sx={{
            borderRadius: 0,
            borderBottomLeftRadius: 4,
            backgroundColor: "surfaceVariant.main",
            ...controlsContainerProps?.sx,
          }}>
          {controls || null}
          {deleteButton && widgetInfo && <DeleteWidgetButton {...widgetInfo} />}
        </Paper>
      )}
      {props.children}
    </Box>
  );
}

export function DeleteWidgetButton(props: DeleteWidgetParameters) {
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  return (
    <IconButton
      color="error"
      onClick={() => dispatch(currentSpaceDeleteWidget(props))}>
      {delete_}
    </IconButton>
  );
}

export default Controls;
