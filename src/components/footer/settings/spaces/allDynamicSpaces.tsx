import { Icon2RN } from "@/theme/icons";
import {
  changeCurrentSpace,
  currentSpaceDeleteSpace,
  currentSpaceDuplicate,
  deleteSpace,
  duplicateSpace,
} from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import ContextMenu from "@/components/contextMenu";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function AllDynamicSpace() {
  const { delete_ } = useCurrentIcons();
  const { allSpaces, currentSpace } = useSelector(
    (state: StateType) => state.layout
  );
  const dispatch = useDispatch();
  return (
    <>
      <List>
        {allSpaces.map((s) => {
          const menuItems: IconMenuType[] = [
            {
              icon: "ion:duplicate",
              name: "Duplicate Space",
              onClick: () => dispatch(duplicateSpace(s.id)),
            },
          ];
          if (s.delete_able) {
            menuItems.push({
              icon: delete_,
              name: "Delete Space",
              onClick: () => dispatch(deleteSpace(s.id)),
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
                  dispatch(changeCurrentSpace({ type: "dynamic", id: s.id }))
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
