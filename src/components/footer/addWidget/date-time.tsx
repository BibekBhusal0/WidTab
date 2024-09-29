import useAvailablePosition from "@/hooks/useAvailablePosition";
import { currentSpaceAddWidget } from "@/redux/slice/layout";
import { widgetDimensions } from "@/utils/getWidget";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

function DateTime() {
  return (
    <div className="flex-center flex-col p-2 gap-4 size-full">
      <AddCalendar />
      <AddClock />
    </div>
  );
}

function AddCalendar() {
  const dispatch = useDispatch();
  const dimensions = widgetDimensions["calendar"];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);

  const add = () => {
    if (availablePosition) {
      dispatch(
        currentSpaceAddWidget({
          type: "calendar",
          gridProps: { ...dimensions, ...availablePosition },
          values: { id: 0 },
        })
      );
    }
  };

  return (
    <Button
      variant="contained"
      disabled={availablePosition === null}
      onClick={add}>
      Add Calendar
    </Button>
  );
}

function AddClock() {
  const dispatch = useDispatch();
  const dimensions = widgetDimensions["clock"];
  const { minH, minW } = dimensions;
  const availablePosition = useAvailablePosition(minW, minH);

  const add = () => {
    if (availablePosition) {
      dispatch(
        currentSpaceAddWidget({
          type: "clock",
          gridProps: { ...dimensions, ...availablePosition },
          values: { id: 0 },
        })
      );
    }
  };

  return (
    <div className="w-full flex-center">
      <Button
        variant="contained"
        disabled={availablePosition === null}
        onClick={add}>
        Add Clock
      </Button>
    </div>
  );
}

export default DateTime;
