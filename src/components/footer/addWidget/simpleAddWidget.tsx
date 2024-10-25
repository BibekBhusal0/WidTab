import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { WidgetMappingAll } from "@/types/slice/widgets";
import { widgetDimensions } from "@/utils/getWidget";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button, { ButtonProps } from "@mui/material/Button";
import { useDispatch } from "react-redux";

export type SimpleAddWidgetButtonProps = {
  widget: WidgetMappingAll;
  buttonProps?: ButtonProps;
};

function SimpleAddWidgetButton({
  widget,
  buttonProps,
}: SimpleAddWidgetButtonProps) {
  const dispatch = useDispatch();
  const dimensions = widgetDimensions[widget.type];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);

  const add = () => {
    if (availablePosition) {
      dispatch(
        currentSpaceAddWidget({
          gridProps: { ...dimensions, ...availablePosition },
          ...widget,
        })
      );
    }
  };

  return (
    <Button
      variant="contained"
      children={<div className="capitalize">Add {widget.type} Widget</div>}
      startIcon={<Icon icon="material-symbols:add" />}
      {...buttonProps}
      disabled={availablePosition === null}
      onClick={add}
    />
  );
}

export default SimpleAddWidgetButton;
