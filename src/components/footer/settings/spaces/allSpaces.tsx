import { changeCurrentSpace } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { controlledWidgetsType } from "@/types/slice/widgets";
import { Box, List, ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function AllSpaces() {
  return (
    <>
      <Box sx={{ boarderTop: "1px solid" }} className="text-3xl py-4">
        Dynamic Spaces
      </Box>
      <AllDynamicSpace />
      <Box sx={{ boarderTop: "1px solid" }} className="text-3xl py-4">
        Static Spaces
      </Box>
      <AllStaticLayout />
    </>
  );
}

export function AllDynamicSpace() {
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

export function AllStaticLayout() {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();

  const completed: Record<controlledWidgetsType, string> = {
    todo: "All To-dos",
    "habit-tracker": "All Habit Trackers",
    bookmark: "All Bookmarks",
  };

  return (
    <List>
      {/*  */}
      {Object.entries(completed).map(([type, name]) => (
        <ListItemButton
          key={type}
          selected={currentSpace.type === "static" && currentSpace.id === type}
          onClick={() =>
            dispatch(
              changeCurrentSpace({
                type: "static",
                id: type as controlledWidgetsType,
              })
            )
          }
          //
        >
          {name}
        </ListItemButton>
      ))}
      {/*  */}
    </List>
  );
}

export default AllSpaces;
