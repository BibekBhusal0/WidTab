import { changeCurrentSpace } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { List, ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function AllDynamicSpace() {
  const { allSpaces, currentSpace } = useSelector(
    (state: StateType) => state.layout
  );
  const dispatch = useDispatch();
  // const
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
            {s.name}
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
export default AllDynamicSpace;
