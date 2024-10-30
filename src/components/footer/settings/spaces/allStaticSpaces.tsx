import useCurrentIcons from "@/hooks/useCurrentIcons";
import { allRequiredIcons } from "@/theme/icons";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { StaticPagesType } from "@/types/slice/widgets";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";

type iconMapping = { name: string; icon: allRequiredIcons };

export const staticPagesIcon: Record<StaticPagesType, iconMapping> = {
  todo: { name: "All To-dos", icon: "checklist" },
  "habit-tracker": { name: "All Habit Trackers", icon: "habitTracker" },
  bookmark: { name: "All Bookmarks", icon: "bookmark" },
};

function AllStaticLayout() {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const themeIcons = useCurrentIcons();
  const dispatch = useDispatch();

  return (
    <List>
      {Object.entries(staticPagesIcon).map(([type, { icon, name }]) => (
        <ListItemButton
          key={type}
          selected={currentSpace.type === "static" && currentSpace.id === type}
          onClick={() =>
            dispatch(
              changeCurrentSpace({
                type: "static",
                id: type as StaticPagesType,
              })
            )
          }>
          <ListItemIcon className="icon-lg">{themeIcons[icon]}</ListItemIcon>
          {name}
        </ListItemButton>
      ))}
    </List>
  );
}
export default AllStaticLayout;
