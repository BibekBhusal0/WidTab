import ContainerSidebar, { SidebarComponent } from "@/components/containerSidebar";
import AddCustomWidget from "./custom";
import AddTodo from "./todo";
import FooterPopover from "@/components/footerPopover";
import DateTime from "./date-time";
import AddSearch from "./search";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import AddHabitTracer from "./habitTracker";
import AddNavigation from "./navigation";
import AddBookmark from "./bookmark";
import AddNote from "./notes";
import AddGemini from "./gemini";

function AddWidget() {
  const { widget } = useCurrentIcons();
  const addItems: SidebarComponent[] = [
    { name: "Search", component: <AddSearch />, index: 0 },
    { name: "Time", component: <DateTime />, index: 1 },
    { name: "Bookmark", component: <AddBookmark />, index: 2 },
    { name: "Note", component: <AddNote />, index: 3 },
    { name: "Todo", component: <AddTodo />, index: 4 },
    { name: "Habit Tracker", component: <AddHabitTracer />, index: 5 },
    { name: "Gemini", component: <AddGemini />, index: 6 },
    { name: "Custom", component: <AddCustomWidget />, index: 7 },
    { name: "Navigation", component: <AddNavigation />, index: 8 },
  ];
  return (
    <FooterPopover tooltip="Add Widget" icon={widget}>
      <ContainerSidebar
        items={addItems}
        mainProps={{ sx: { width: "550px", height: "350px" } }}
        tabsProps={{ sx: { width: "200px" } }}
        tabProps={{ sx: { minHeight: "38px", paddingY: "10px" } }}
      />
    </FooterPopover>
  );
}

export default AddWidget;
