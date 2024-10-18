import { switchTheme } from "@/redux/slice/theme";
import { StateType } from "@/redux/store";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import { useDispatch, useSelector } from "react-redux";
import AddTheme from "./addTheme";

function AllThemes() {
  const { allThemes, currentThemeID } = useSelector(
    (state: StateType) => state.theme
  );
  const dispatch = useDispatch();
  return (
    <>
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
    </>
  );
}
export default AllThemes;
