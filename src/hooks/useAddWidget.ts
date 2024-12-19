import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { WidgetMappingAll } from "@/types/slice/widgets";
import { widgetDimensions } from "@/utils/getWidget";
import { useDispatch } from "react-redux";

function useAddWidget(widget: WidgetMappingAll) {
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

  return { add, dimensions, availablePosition };
}

export default useAddWidget;
