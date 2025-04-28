import { allWidgetsType, AllWidgetPropsMapping, WidgetType } from "@/types/slice/widgets";
import { FunctionComponent } from "react";
import Controls from "./controls";
import { getWidgetControlsProps, widgetElementMapping } from "@/utils/getWidget";

function Widget({ widget }: { widget: WidgetType }) {
  const Element = widgetElementMapping[widget.type] as FunctionComponent<
    AllWidgetPropsMapping<allWidgetsType>
  >;
  return (
    <>
      <Controls {...getWidgetControlsProps(widget.type, widget.values.id)}>
        <Element {...widget.values} />
      </Controls>
    </>
  );
}

export default Widget;
