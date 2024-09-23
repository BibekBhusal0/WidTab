import { switchTheme } from "@/redux/slice/theme";
import { StateType } from "@/redux/store";
import { List, ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddTheme from "./addTheme";

function AllThemeSettings() {
  const { allThemes, currentThemeID } = useSelector(
    (state: StateType) => state.theme
  );
  const dispatch = useDispatch();
  return (
    <div className="w-full">
      <div className="text-3xl">All Themes</div>
      <List>
        {allThemes.map((p) => (
          <ListItemButton
            selected={p.id === currentThemeID}
            key={p.id}
            onClick={() => dispatch(switchTheme(p.id))}
            //
          >
            {p.name}
          </ListItemButton>
        ))}
      </List>
      <AddTheme />
    </div>
  );
}
export default AllThemeSettings;
