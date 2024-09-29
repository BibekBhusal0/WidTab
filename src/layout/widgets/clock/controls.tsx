import { ReactNode } from "react";
import { ClockWidgetType } from "@/types/slice/widgets";
import MenuPopover from "@/components/popoverMenu";
import WidgetControls from "@/components/widgetControl";
import { Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { currentSpaceEditWidget } from "@/redux/slice/layout";

function ClockControls({
  id,
  TwentyFourHour,
  clockType,
  showSeconds,
}: ClockWidgetType) {
  const dispatch = useDispatch();

  const toggleTwentyFourHour = () => {
    dispatch(
      currentSpaceEditWidget({
        type: "clock",
        values: { id, TwentyFourHour: !TwentyFourHour, clockType, showSeconds },
      })
    );
  };
  const toggleShowSeconds = () => {
    dispatch(
      currentSpaceEditWidget({
        type: "clock",
        values: { id, TwentyFourHour, clockType, showSeconds: !showSeconds },
      })
    );
  };

  const toggleClockType = () => {
    const newClockType = clockType === "analog" ? "digital" : "analog";
    dispatch(
      currentSpaceEditWidget({
        type: "clock",
        values: { id, TwentyFourHour, clockType: newClockType, showSeconds },
      })
    );
  };

  const switches = [
    {
      title: "24 H",
      toggled: TwentyFourHour,
      toggle: toggleTwentyFourHour,
    },
    { title: "Seconds", toggled: showSeconds, toggle: toggleShowSeconds },
    {
      title: "Analog",
      toggled: clockType === "analog",
      toggle: toggleClockType,
    },
  ];

  return (
    <WidgetControls className="">
      <MenuPopover>
        {switches.map(({ title, toggled, toggle }) => (
          <TwoItems
            key={title}
            item1={title}
            item2={<Switch checked={toggled} onChange={toggle} />}
          />
        ))}
      </MenuPopover>
    </WidgetControls>
  );
}
const TwoItems = ({ item1, item2 }: { item1: ReactNode; item2: ReactNode }) => {
  return (
    <div className="between gap-2 w-full">
      <div>{item1}</div> {item2}{" "}
    </div>
  );
};

export default ClockControls;
