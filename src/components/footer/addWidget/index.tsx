import { ReactNode } from "react";
import ContainerSidebar from "@/components/containerSidebar";
import AddCustomWidget from "./custom";
import AddTodo from "./todo";
import FooterPopover from "@/components/footerPopover";
import DateTime from "./date-time";
import AddSearch from "./search";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import AddHabitTracer from "./habitTracker";
import AddNavigation from "./navigation";
type widgetAddObjectType = {
  index: number;
  name: string;
  component: ReactNode;
};
function AddWidget() {
  const { widget } = useCurrentIcons();
  const addItems: widgetAddObjectType[] = [
    { index: 0, name: "Custom", component: <AddCustomWidget /> },
    { index: 1, name: "Todo", component: <AddTodo /> },
    { index: 2, name: "DateTime", component: <DateTime /> },
    { index: 3, name: "Search", component: <AddSearch /> },
    { index: 4, name: "Habit Tracker", component: <AddHabitTracer /> },
    { index: 5, name: "Navigation", component: <AddNavigation /> },
  ];
  return (
    <FooterPopover tooltip="Add Widget" icon={widget}>
      <ContainerSidebar
        items={addItems}
        mainProps={{ sx: { width: "500px", height: "350px" } }}
        tabsProps={{ sx: { width: "150px" } }}
      />
    </FooterPopover>
  );
}

export default AddWidget;
