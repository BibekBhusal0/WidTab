import { ClockWidgetType } from "@/types/slice/widgets";
import MenuPopover from "@/components/popoverMenu";
import WidgetControls from "@/components/widgetControl";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch } from "react-redux";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/redux/slice/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import Autocomplete from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";
import IconMenu from "@/components/menuWithIcon";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import moment from "moment-timezone";

function ClockControls({ ...props }: ClockWidgetType) {
  const { id, TwentyFourHour, clockType, showSeconds, timeZone, showTimeZone } =
    props;
  const dispatch = useDispatch();
  const { delete_ } = useCurrentIcons();

  const toggleValue = (
    type: "TwentyFourHour" | "showSeconds" | "showTimeZone"
  ) => {
    dispatch(
      currentSpaceEditWidget({
        type: "clock",
        values: { ...props, [type]: !props[type] },
      })
    );
  };

  const changeTimezone = (_: any, newValue: string | null) => {
    dispatch(
      currentSpaceEditWidget({
        type: "clock",
        values: { ...props, timeZone: newValue || undefined },
      })
    );
  };

  const switches: MenuSwitchProps["items"] = [
    {
      onChange() {
        toggleValue("TwentyFourHour");
      },
      title: clockType === "analog" ? "Show Numbers" : "24 Hours",
      checked: TwentyFourHour,
    },
    {
      onChange() {
        toggleValue("showSeconds");
      },
      title: "Show Seconds",
      checked: showSeconds,
    },
    {
      onChange() {
        toggleValue("showTimeZone");
      },
      title: "Show TimeZone",
      checked: showTimeZone,
    },
  ];

  const onClockTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newClockType: string | null
  ) => {
    if (!newClockType) return;
    if (!["analog", "digital"].includes(newClockType)) return;
    dispatch(
      currentSpaceEditWidget({
        type: "clock",
        values: {
          ...props,
          clockType: newClockType as ClockWidgetType["clockType"],
        },
      })
    );
  };

  const deleteThis = () =>
    dispatch(currentSpaceDeleteWidget({ type: "clock", id }));
  const allTimezones = moment.tz.names();

  return (
    <WidgetControls>
      <MenuPopover>
        <MenuItem
          sx={{ justifyContent: "space-between", flexDirection: "column" }}
          className="gap-2">
          <div className="text-2xl">Clock Type</div>
          <ToggleButtonGroup
            value={clockType}
            exclusive
            onChange={onClockTypeChange}
            aria-label="text alignment">
            <ToggleButton value="digital"> Digital</ToggleButton>
            <ToggleButton value="analog"> Analog</ToggleButton>
          </ToggleButtonGroup>
        </MenuItem>
        <Divider />
        <MenuItem className="p-2 ">
          <Autocomplete
            fullWidth
            disableClearable
            value={timeZone}
            onChange={changeTimezone}
            options={allTimezones}
            renderInput={(params) => <TextField {...params} label="Timezone" />}
          />
        </MenuItem>
        <Divider />
        <MenuSwitch items={switches} />
        <Divider />
        <IconMenu
          menuItems={[
            {
              icon: delete_,
              name: "Delete",
              onClick: deleteThis,
              color: "error.main",
            },
          ]}
        />
      </MenuPopover>
    </WidgetControls>
  );
}

export default ClockControls;
