import useAddWidget from "@/hooks/useAddWidget";
import { WidgetMappingAll } from "@/types/slice/widgets";
import { Icon } from "@iconify/react";
import Button, { ButtonProps } from "@mui/material/Button";

export type SimpleAddWidgetButtonProps = {
  widget: WidgetMappingAll;
  buttonProps?: ButtonProps;
};

function SimpleAddWidgetButton({
  widget,
  buttonProps,
}: SimpleAddWidgetButtonProps) {
  const { add, availablePosition } = useAddWidget(widget);

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
