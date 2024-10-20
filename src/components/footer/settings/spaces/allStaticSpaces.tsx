import useCurrentIcons from "@/hooks/useCurrentIcons";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { controlledWidgetsType } from "@/types/slice/widgets";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

type iconMapping = {
  name: string;
  icon: ReactNode;
};
function AllStaticLayout() {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const { bookmark, checklist, habitTracker } = useCurrentIcons();
  const dispatch = useDispatch();

  const completed: Record<controlledWidgetsType, iconMapping> = {
    todo: { name: "All To-dos", icon: checklist },
    "habit-tracker": { name: "All Habit Trackers", icon: habitTracker },
    bookmark: { name: "All Bookmarks", icon: bookmark },
  };

  return (
    <List>
      {Object.entries(completed).map(([type, { icon, name }]) => (
        <ListItemButton
          key={type}
          selected={currentSpace.type === "static" && currentSpace.id === type}
          onClick={() =>
            dispatch(
              changeCurrentSpace({
                type: "static",
                id: type as controlledWidgetsType,
              })
            )
          }>
          <ListItemIcon className="icon-lg">{icon}</ListItemIcon>
          {name}
        </ListItemButton>
      ))}
      {/*  */}
    </List>
  );
}
export default AllStaticLayout;
