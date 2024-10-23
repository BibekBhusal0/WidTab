import useCurrentLayout from "@/hooks/useCurrentLayout";
import { DeleteWidgetParameters } from "@/types/slice/widgets";
import IconButton from "@mui/material/IconButton";

import { useDispatch } from "react-redux";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import WidgetControls from "@/components/widgetControl";
import { ReactNode } from "react";
import useCurrentIcons from "@/hooks/useCurrentIcons";

type simpleWidgetProps = DeleteWidgetParameters & {
  children: ReactNode;
};

function SimpleWidget({ children, ...props }: simpleWidgetProps) {
  const layout = useCurrentLayout();
  const showControls = !layout?.locked;

  return (
    <div className="size-full relative overflow-hidden">
      {showControls && <DeleteWidgetButton {...props} />}
      {children}
    </div>
  );
}

export function DeleteWidgetButton(props: DeleteWidgetParameters) {
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  return (
    <WidgetControls>
      <IconButton
        color="error"
        onClick={() => dispatch(currentSpaceDeleteWidget(props))}>
        {delete_}
      </IconButton>
    </WidgetControls>
  );
}

export default SimpleWidget;
