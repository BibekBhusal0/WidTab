import { ClockWidgetType } from "@/types/slice/widgets";
import MenuPopover from "@/components/popoverMenu";
import WidgetControls from "@/components/widgetControl";
import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/redux/slice/layout";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const toggleSeconds = () => {
    dispatch(
      currentSpaceEditWidget({
        type: "clock",
        values: { id, TwentyFourHour, clockType, showSeconds: !showSeconds },
      })
    );
  };
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
          id,
          TwentyFourHour,
          clockType: newClockType as ClockWidgetType["clockType"],
          showSeconds,
        },
      })
    );
  };
  const deleteThis = () => {
    dispatch(currentSpaceDeleteWidget({ type: "clock", id }));
  };

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
        <MenuSwitchItem
          checked={TwentyFourHour}
          onChange={toggleTwentyFourHour}
          title={clockType === "analog" ? "Show Numbers" : "24 Hours"}
        />
        <MenuSwitchItem
          checked={showSeconds}
          onChange={toggleSeconds}
          title="Show Seconds"
        />
        <Divider />
        <ListItemButton
          sx={{ justifyContent: "space-around" }}
          className="gap-5 items-center"
          onClick={deleteThis}>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <Box sx={{ color: "error.main" }} className="text-xl">
            Delete
          </Box>
        </ListItemButton>
      </MenuPopover>
    </WidgetControls>
  );
}

const MenuSwitchItem = ({
  checked,
  onChange,
  title,
}: {
  checked?: boolean;
  onChange: () => void;
  title: string;
}) => {
  return (
    <MenuItem
      sx={{ justifyContent: "space-between" }}
      onClick={onChange}
      className="capitalize between gap-4 w-full">
      <div className="text-xl">{title}</div>
      <Switch checked={checked} onChange={onChange} />
    </MenuItem>
  );
};

export default ClockControls;
