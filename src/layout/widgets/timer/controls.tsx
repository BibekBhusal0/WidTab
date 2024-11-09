import MenuPopover from "@/components/popoverMenu";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/redux/slice/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import IconMenu from "@/components/menuWithIcon";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import useCurrentLayout from "@/hooks/useCurrentLayout";

function TimerControls({ id }: { id: number }) {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  const { delete_ } = useCurrentIcons();
  if (!layout) return null;
  const { widgets } = layout;
  const widget = widgets.find((w) => w.type === "timer" && w.values.id === id);
  if (!widget || widget.type !== "timer") return null;
  const props = widget.values;
  const { music = false } = props;
  const toggleMusic = () =>
    dispatch(
      currentSpaceEditWidget({
        type: "timer",
        values: { ...props, music: !music },
      })
    );

  const switches: MenuSwitchProps["items"] = [
    { onChange: toggleMusic, title: "Music", checked: music },
  ];

  const deleteThis = () =>
    dispatch(currentSpaceDeleteWidget({ type: "timer", id }));
  const menuItems = [
    {
      icon: delete_,
      name: "Delete",
      onClick: deleteThis,
      color: "error.main",
    },
  ];

  return (
    <MenuPopover>
      <MenuSwitch items={switches} />
      <Divider />
      <IconMenu menuItems={menuItems} />
    </MenuPopover>
  );
}

export default TimerControls;
