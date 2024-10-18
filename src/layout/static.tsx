import { controlledWidgetsType } from "@/types/slice/widgets";
import { FunctionComponent, ReactNode } from "react";
import TodoPage from "./pages/todo";
import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { positionProps } from "@/types/slice/layout";
import Box from "@mui/material/Box";
import { cn } from "@/utils/cn";

interface StaticLayoutProps {
  widgetType: controlledWidgetsType;
}

const StaticLayout: FunctionComponent<StaticLayoutProps> = ({ widgetType }) => {
  const { toolBarPosition } = useSelector((state: StateType) => state.layout);
  const { mainComponentProps } = positionProps[toolBarPosition];
  const layoutMapping: Record<controlledWidgetsType, ReactNode> = {
    todo: <TodoPage />,
    "habit-tracker": null,
    bookmark: null,
  };
  return (
    <Box
      {...mainComponentProps}
      sx={{ ...mainComponentProps?.sx }}
      className={cn(
        "relative w-full overflow-auto",
        mainComponentProps?.className
      )}
      //
    >
      {layoutMapping[widgetType]}
    </Box>
  );
};

export default StaticLayout;
