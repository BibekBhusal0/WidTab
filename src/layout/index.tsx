import useCurrentLayout from "@/hooks/useCurrentLayout";
import DynamicLayout from "./dynamic";
import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { controlledWidgetsType } from "@/types/slice/widgets";
import StaticLayout from "./static";

function Main({ height }: { height: number }) {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const layout = useCurrentLayout();
  if (!layout) {
    const l: controlledWidgetsType =
      typeof currentSpace.id === "number" ? "todo" : currentSpace.id;

    return <StaticLayout widgetType={l} height={height}></StaticLayout>;
  }
  return <DynamicLayout height={height}></DynamicLayout>;
}

export default Main;
