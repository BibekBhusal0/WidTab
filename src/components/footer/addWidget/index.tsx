import ContainerSidebar, {
  SidebarComponent,
} from "@/components/containerSidebar";
import AddCustomWidget from "./custom";
import AddTodo from "./todo";
import FooterPopover from "@/components/footerPopover";
import DateTime from "./date-time";
import AddSearch from "./search";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import AddHabitTracer from "./habitTracker";
import AddNavigation from "./navigation";
import AddTimer from "./timer";
import AddBookmark from "./bookmark";

function AddWidget() {
  const { widget } = useCurrentIcons();
  const addItems: SidebarComponent[] = [
    { index: 0, name: "Custom", component: <AddCustomWidget /> },
    { index: 1, name: "Todo", component: <AddTodo /> },
    { index: 2, name: "Time", component: <DateTime /> },
    { index: 3, name: "Search", component: <AddSearch /> },
    { index: 4, name: "Habit Tracker", component: <AddHabitTracer /> },
    { index: 5, name: "Navigation", component: <AddNavigation /> },
    { index: 6, name: "Bookmark", component: <AddBookmark /> },
  ];
  return (
    <FooterPopover tooltip="Add Widget" icon={widget}>
      <ContainerSidebar
        items={addItems}
        mainProps={{ sx: { width: "550px", height: "350px" } }}
        tabsProps={{
          sx: { width: "200px" },
          scrollButtons: "auto",
          variant: "scrollable",
        }}
        tabProps={{ sx: { minHeight: "38px", paddingY: "10px" } }}
      />
    </FooterPopover>
  );
}

export default AddWidget;
