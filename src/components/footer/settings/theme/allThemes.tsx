import { deleteTheme, duplicateTheme, switchTheme } from "@/redux/slice/theme";
import { StateType } from "@/redux/store";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { useDispatch, useSelector } from "react-redux";
import AddTheme from "./addTheme";
import ContextMenu from "@/components/contextMenu";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function AllThemes() {
  const { allThemes, currentThemeID } = useSelector(
    (state: StateType) => state.theme
  );
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  return (
    <>
      <List>
        {allThemes.map((theme) => {
          const menuItems: IconMenuType[] = [
            {
              name: "Duplicate Theme",
              icon: "ion:duplicate",
              onClick: () => dispatch(duplicateTheme(theme.id)),
            },
          ];
          if (theme.editAble) {
            menuItems.push({
              name: "Delete Theme",
              icon: delete_,
              color: "error.main",
              onClick: () => dispatch(deleteTheme(theme.id)),
            });
          }
          return (
            <ContextMenu
              menuContent={<IconMenu menuItems={menuItems} />}
              key={theme.id}>
              <ListItemButton
                selected={theme.id === currentThemeID}
                onClick={() => dispatch(switchTheme(theme.id))}
                //
              >
                {theme.name}
              </ListItemButton>
            </ContextMenu>
          );
        })}
      </List>
      <AddTheme />
    </>
  );
}
export default AllThemes;
