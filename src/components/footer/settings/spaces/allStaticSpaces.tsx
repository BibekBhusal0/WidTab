import { changeCurrentSpace } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { controlledWidgetsType } from "@/types/slice/widgets";
import { List, ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function AllStaticLayout() {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();

  const completed: Record<controlledWidgetsType, string> = {
    todo: "All To-dos",
    "habit-tracker": "All Habit Trackers",
    bookmark: "All Bookmarks",
  };

  return (
    <List>
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
          }>
          {name}
        </ListItemButton>
      ))}
      {/*  */}
    </List>
  );
}
export default AllStaticLayout;
