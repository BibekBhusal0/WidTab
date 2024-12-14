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
import ContextMenu from "@/components/contextMenu";
import MenuPopover from "@/components/popoverMenu";
import IconMenu from "@/components/menuWithIcon";

export type ControlsProps = {
  widgetInfo?: DeleteWidgetParameters;
  controls?: ReactNode;
  controlsContainerProps?: PaperProps;
  deleteButton?: boolean;
  showOn?: null | "hover" | "always";
  showContextMenu?: boolean;
  contextMenu?: ReactNode;
  includePopover?: boolean;
} & Omit<BoxProps, "contextMenu">;

function Controls({
  controls = null,
  widgetInfo,
  controlsContainerProps = {},
  deleteButton = true,
  showOn = null,
  showContextMenu = true,
  includePopover = true,
  contextMenu = undefined,
  ...props
}: ControlsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { locked } = useSelector((state: StateType) => state.layout);
  const show =
    showOn === "always" || (showOn === "hover" && isHovered) || !locked;
  const showDelete = deleteButton && widgetInfo;
  const handleMouseIn = () => {
    if (showOn === "hover") setIsHovered(true);
  };
  const handleMouseOut = () => {
    if (showOn === "hover") setIsHovered(false);
  };
  const newControls =
    controls === null ? null : includePopover ? (
      <MenuPopover>{controls}</MenuPopover>
    ) : (
      controls
    );
  const component = (
    <Box
      {...props}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      className={cn("size-full relative", props.className)}>
      {show && (
        <Paper
          {...controlsContainerProps}
          className={cn(
            "absolute right-0 top-0 px-2 py-1 z-20 widget-control icon-md flex-center",
            controlsContainerProps?.className
          )}
          sx={{
            borderRadius: 0,
            borderBottomLeftRadius: 4,
            backgroundColor: "surfaceVariant.main",
            ...controlsContainerProps?.sx,
          }}>
          {newControls || null}
          {showDelete && <DeleteWidgetButton {...widgetInfo} />}
        </Paper>
      )}
      {props.children}
    </Box>
  );
  if (!showContextMenu) return component;
  var menuContent = contextMenu || controls;
  if (!menuContent && !showDelete) return component;

  if (showDelete) {
    menuContent = (
      <>
        {menuContent} <DeleteWidgetButton {...widgetInfo} buttonType="menu" />
      </>
    );
  }
  return <ContextMenu menuContent={menuContent}>{component}</ContextMenu>;
}

type deleteWidgetButtonProps = {
  buttonType?: "icon" | "menu";
} & DeleteWidgetParameters;
export function DeleteWidgetButton({
  buttonType = "icon",
  ...props
}: deleteWidgetButtonProps) {
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  const onClick = () => dispatch(currentSpaceDeleteWidget(props));

  if (buttonType === "icon")
    return <IconButton color="error" onClick={onClick} children={delete_} />;
  return (
    <IconMenu
      menuItems={[
        { icon: delete_, name: "Delete", onClick, color: "error.main" },
      ]}
    />
  );
}

export default Controls;
