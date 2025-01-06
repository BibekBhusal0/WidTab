import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/storage/layout";
import { WidgetMappingAll } from "@/types/slice/widgets";
import { widgetDimensions } from "@/utils/getWidget";

function useAddWidget(widget: WidgetMappingAll) {
  const dimensions = widgetDimensions[widget.type];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);

  const add = () => {
    if (availablePosition) {
      currentSpaceAddWidget({
        gridProps: { ...dimensions, ...availablePosition },
        ...widget,
      });
    }
  };

  return { add, dimensions, availablePosition };
}

export default useAddWidget;
