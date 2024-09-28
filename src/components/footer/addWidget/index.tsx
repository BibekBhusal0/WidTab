import { ReactNode } from "react";
import ContainerSidebar from "@/components/containerSidebar";
import { HiViewGridAdd } from "react-icons/hi";
import AddCustomWidget from "./custom";
import { allWidgetsType } from "@/types/slice/widgets";
import AddTodo from "./todo";
import FooterPopover from "@/components/footerPopover";
type widgetAddObjectType = {
  index: number;
  name: allWidgetsType;
  component: ReactNode;
};
function AddWidget() {
  const addItems: widgetAddObjectType[] = [
    { index: 0, name: "custom", component: <AddCustomWidget /> },
    { index: 1, name: "todo", component: <AddTodo /> },
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
