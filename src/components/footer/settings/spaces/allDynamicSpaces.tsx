import { Icon2RN } from "@/theme/icons";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContextMenu from "@/components/contextMenu";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { useLayout } from "@/storage";
import {
  changeCurrentSpace,
  deleteSpace,
  duplicateSpace,
} from "@/storage/layout";

function AllDynamicSpace() {
  const { delete_ } = useCurrentIcons();
  const { allSpaces, currentSpace } = useLayout();
  return (
    <>
      <List>
        {allSpaces.map((s) => {
          const menuItems: IconMenuType[] = [
            {
              icon: "ion:duplicate",
              name: "Duplicate Space",
              onClick: () => duplicateSpace(s.id),
            },
          ];
          if (s.delete_able) {
            menuItems.push({
              icon: delete_,
              name: "Delete Space",
              onClick: () => deleteSpace(s.id),
              color: "error.main",
            });
          }
          return (
            <ContextMenu
              key={s.id}
              menuContent={<IconMenu menuItems={menuItems} />}>
              <ListItemButton
                selected={
                  currentSpace.type === "dynamic" && currentSpace.id === s.id
                }
                onClick={() =>
                  changeCurrentSpace({ type: "dynamic", id: s.id })
                }>
                <ListItemIcon className="icon-lg">
                  <Icon2RN icon={s.icon} />
                </ListItemIcon>
                {s.name}
              </ListItemButton>
            </ContextMenu>
          );
        })}
      </List>
    </>
  );
}
export default AllDynamicSpace;
