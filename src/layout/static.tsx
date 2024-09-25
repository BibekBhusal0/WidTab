import { controlledWidgetsType } from "@/types/slice/widgets";
import { FunctionComponent, ReactNode } from "react";
import TodoPage from "./pages/todo";

interface StaticLayoutProps {
  height: number;
  widgetType: controlledWidgetsType;
}

const StaticLayout: FunctionComponent<StaticLayoutProps> = ({
  height,
  widgetType,
}) => {
  const layoutMapping: Record<controlledWidgetsType, ReactNode> = {
    todo: <TodoPage />,
    "habit-tracker": null,
    bookmark: null,
  };
  return (
    <div
      style={{ height: `${height}%` }}
      className="relative w-full"
      //
    >
      {layoutMapping[widgetType]}
    </div>
  );
};

export default StaticLayout;
