import { RemovableToolbarIcons } from "@/types/slice/layout";
import TodoButton from "./todoButton";
import Spaces from "./spaces";
import { Fragment, ReactNode } from "react";
import Lock from "./lock";
import ThemeSwitch from "@/theme/switch";
import { useLayout } from "@/storage";

function RemovableButtons() {
  const { toolBarIcons } = useLayout();
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
