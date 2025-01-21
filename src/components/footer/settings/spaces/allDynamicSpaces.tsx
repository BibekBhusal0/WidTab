import { Icon2RN } from "@/theme/icons";
import {
  changeCurrentSpace,
  deleteSpace,
  duplicateSpace,
  reorderSpaces,
} from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import ContextMenu from "@/components/contextMenu";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/sortable";

function AllDynamicSpace() {
  const { delete_ } = useCurrentIcons();
  const { allSpaces, currentSpace } = useSelector(
    (state: StateType) => state.layout
  );
  const dispatch = useDispatch();
  return (
    <List>
      <Sortable
        value={allSpaces}
        orientation="vertical"
        onValueChange={(value) => dispatch(reorderSpaces(value))}>
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
            <SortableItem value={s.id} key={s.id}>
              <ContextMenu menuContent={<IconMenu menuItems={menuItems} />}>
                <ListItemButton
                  selected={
                    currentSpace.type === "dynamic" && currentSpace.id === s.id
                  }
                  onClick={() =>
                    dispatch(changeCurrentSpace({ type: "dynamic", id: s.id }))
                  }
                  sx={{ justifyContent: "space-between" }}
                  className="flex">
                  <div className="flex">
                    <ListItemIcon className="icon-lg">
                      <Icon2RN icon={s.icon} />
                    </ListItemIcon>
                    <div className="text-md">{s.name}</div>
                  </div>
                  <SortableDragHandle
                    children={<Icon2RN icon="icon-park-outline:drag" />}
                  />
                </ListItemButton>
              </ContextMenu>
            </SortableItem>
          );
        })}
      </Sortable>
    </List>
  );
}
export default AllDynamicSpace;
