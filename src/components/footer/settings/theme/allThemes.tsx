import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import AddTheme from "./addTheme";
import ContextMenu from "@/components/contextMenu";
import IconMenu, { IconMenuType } from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { useThemeState } from "@/storage";
import { deleteTheme, duplicateTheme, switchTheme } from "@/storage/theme";

function AllThemes() {
  const { allThemes, currentThemeID } = useThemeState();
  const { delete_ } = useCurrentIcons();
  return (
    <>
      <List>
        {allThemes.map((theme) => {
          const menuItems: IconMenuType[] = [
            {
              name: "Duplicate Theme",
              icon: "ion:duplicate",
              onClick: () => duplicateTheme(theme.id),
            },
          ];
          if (theme.editAble) {
            menuItems.push({
              name: "Delete Theme",
              icon: delete_,
              color: "error.main",
              onClick: () => deleteTheme(theme.id),
            });
          }
          return (
            <ContextMenu
              menuContent={<IconMenu menuItems={menuItems} />}
              key={theme.id}>
              <ListItemButton
                selected={theme.id === currentThemeID}
                onClick={() => switchTheme(theme.id)}
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
