import dayjs from "@/dayjsConfig";
import { HabitTrackerStatsSingleProps } from "@/types/slice/habit-tracker";
import useFullSize from "@/hooks/useFullSize";
import Button, { ButtonProps } from "@mui/material/Button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import BarGraph from "./graphs/bar";
import { generateCompleteData } from "@/utils/getCompleteData";

function HabitTrackerStatsSingle({ ...props }: HabitTrackerStatsSingleProps) {
  const { ref, size } = useFullSize();
  const weekly = size.width < 800;

  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDate = weekly
    ? currentDate.startOf("week")
    : currentDate.startOf("month");
  const endDate = weekly
    ? currentDate.endOf("week")
    : currentDate.endOf("month");

  const completeData = generateCompleteData(props.history, startDate, endDate);

  const handlePrevious = () => {
    setCurrentDate((prev: dayjs.Dayjs) =>
      weekly ? prev.subtract(1, "week") : prev.subtract(1, "month")
    );
  };

  const handleNext = () => {
    setCurrentDate((prev: dayjs.Dayjs) =>
      weekly ? prev.add(1, "week") : prev.add(1, "month")
    );
  };

  const isCurrentPeriod = () => {
    const now = dayjs();
    return weekly
      ? currentDate.isSame(now, "week")
      : currentDate.isSame(now, "month");
  };

  const btnProps: ButtonProps = {
    variant: "text",
    size: "small",
  };
  return (
    <div className="size-full p-2">
      <div className="size-full flex-center flex-col gap-2" ref={ref}>
        <div aria-label="title-and-buttons" className="full-between px-3">
          <Button
            startIcon={<Icon icon="bi:arrow-left" />}
            {...btnProps}
            onClick={handlePrevious}>
            Previous
          </Button>
          <h6>{props.title}</h6>
          <Button
            {...btnProps}
            onClick={handleNext}
            endIcon={<Icon icon="bi:arrow-right" />}
            disabled={isCurrentPeriod()}>
            Next
          </Button>
        </div>
        <BarGraph
          data={completeData}
          size={size}
          {...props}
          showTarget={!!props.target}
        />
      </div>
    </div>
  );
}

export default HabitTrackerStatsSingle;
