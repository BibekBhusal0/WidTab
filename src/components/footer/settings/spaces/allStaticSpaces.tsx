import useCurrentIcons from "@/hooks/useCurrentIcons";
import { useLayout } from "@/storage";
import { changeCurrentSpace } from "@/storage/layout";
import { allRequiredIcons } from "@/theme/icons";
import { StaticPagesType } from "@/types/slice/widgets";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

type iconMapping = { name: string; icon: allRequiredIcons };

export const staticPagesIcon: Record<StaticPagesType, iconMapping> = {
  todo: { name: "All To-dos", icon: "checklist" },
  "habit-tracker": { name: "All Habit Trackers", icon: "habitTracker" },
  bookmark: { name: "All Bookmarks", icon: "bookmark" },
  note: { name: "All Notes", icon: "note" },
};

function AllStaticLayout() {
  const { currentSpace } = useLayout();
  const themeIcons = useCurrentIcons();

  return (
    <List>
      {Object.entries(staticPagesIcon).map(([type, { icon, name }]) => (
        <ListItemButton
          key={type}
          selected={currentSpace.type === "static" && currentSpace.id === type}
          onClick={() =>
            changeCurrentSpace({
              type: "static",
              id: type as StaticPagesType,
            })
          }>
          <ListItemIcon className="icon-lg">{themeIcons[icon]}</ListItemIcon>
          {name}
        </ListItemButton>
      ))}
    </List>
  );
}
export default AllStaticLayout;
