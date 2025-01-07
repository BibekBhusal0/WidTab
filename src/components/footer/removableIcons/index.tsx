import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { RemovableToolbarIcons } from "@/types/slice/layout";
import TodoButton from "./todoButton";
import Spaces from "./spaces";
import { Fragment, ReactNode } from "react";
import Lock from "./lock";
import ThemeSwitch from "@/theme/switch";

function RemovableButtons() {
  const { toolBarIcons } = useSelector((state: StateType) => state.layout);
  const iconsMapping: Record<RemovableToolbarIcons, ReactNode> = {
    spaces: <Spaces />,
    todo: <TodoButton />,
    theme: <ThemeSwitch />,
    lock: <Lock />,
  };

  return (
    <>
      {Object.entries(iconsMapping).map(([key, component]) => {
        if (toolBarIcons.includes(key as RemovableToolbarIcons)) {
          return <Fragment key={key}>{component}</Fragment>;
        } else {
          return null;
        }
      })}
    </>
  );
}

export default RemovableButtons;
