import { ReactNode } from "react";
import ContainerSidebar from "@/components/containerSidebar";
import { HiViewGridAdd } from "react-icons/hi";
import AddCustomWidget from "./custom";
import AddTodo from "./todo";
import FooterPopover from "@/components/footerPopover";
import DateTime from "./date-time";
type widgetAddObjectType = {
  index: number;
  name: string;
  component: ReactNode;
};
function AddWidget() {
  const addItems: widgetAddObjectType[] = [
    { index: 0, name: "custom", component: <AddCustomWidget /> },
    { index: 1, name: "todo", component: <AddTodo /> },
    { index: 2, name: "Date-Time", component: <DateTime /> },
  ];
  return (
    <FooterPopover tooltip="Add Widget" icon={<HiViewGridAdd />}>
      <ContainerSidebar
        items={addItems}
        mainProps={{ sx: { width: "400px", height: "300px" } }}
        tabsProps={{ sx: { width: "150px" } }}
      />
    </FooterPopover>
  );
}

export default AddWidget;
