import { IconButton, Popover } from "@mui/material";
import { ReactNode, useState } from "react";
import ContainerSidebar from "@/components/containerSidebar";
import { HiViewGridAdd } from "react-icons/hi";
import AddCustomWidget from "./custom";
import { allWidgetsType } from "@/types/slice/widgets";
import AddTodo from "./todo";

function AddWidget() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleOpen} aria-label="settings">
        <HiViewGridAdd />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        marginThreshold={30}
        open={open}
        onClose={handleClose}>
        <AddWidgetMenu />
      </Popover>
    </>
  );
}

type widgetAddObjectType = {
  index: number;
  name: allWidgetsType;
  component: ReactNode;
};

function AddWidgetMenu() {
  const addItems: widgetAddObjectType[] = [
    { index: 0, name: "custom", component: <AddCustomWidget /> },
    { index: 1, name: "todo", component: <AddTodo /> },
  ];

  return (
    <ContainerSidebar
      items={addItems}
      mainProps={{ sx: { width: "400px", height: "300px" } }}
      tabsProps={{ sx: { width: "70px" } }}
    />
  );
}

export default AddWidget;
