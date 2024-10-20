import { Icon2RN } from "@/icons";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";

function AllDynamicSpace() {
  const { allSpaces, currentSpace } = useSelector(
    (state: StateType) => state.layout
  );
  const dispatch = useDispatch();
  return (
    <>
      <List>
        {allSpaces.map((s) => (
          <ListItemButton
            key={s.id}
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
        ))}
      </List>
    </>
  );
}
export default AllDynamicSpace;
