import FavoritesWidget from "@/layout/widgets/favorites";
import HabitTracker from "@/layout/widgets/habit-tracker";
import Todo from "@/layout/widgets/todo";
import { StateType } from "@/redux/store";
import { cn } from "@/utils/cn";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

function Popup() {
  const {
    todo: { pinnedTodo },
    habitTracker: { pinned },
    bookmarks: { favorites },
  } = useSelector((state: StateType) => state);
  const showRightPanel = pinnedTodo !== null || pinned !== null;
  const showFavorites = favorites.length !== 0;
  const contentEmpty = pinnedTodo === null && pinned === null && !showFavorites;

  return (
    <div
      className={cn(
        "flex gap-4 m-4 h-[500px]",
        showRightPanel && showFavorites ? "w-[750px]" : "w-[400px] flex-center"
      )}>
      {contentEmpty && (
        <div className="grow text-xl text-center">
          You have not Pinned any todo or habit tracker and you don't have any
          favorites.
        </div>
      )}
      {showFavorites && <Favorites />}

      {showRightPanel && (
        <div className="flex flex-col gap-4">
          <PinnedTodo />
          <PinnedHabitTracker />
        </div>
      )}
    </div>
  );
}

const Favorites = () => (
  <Paper
    className="h-full w-[350px] relative"
    sx={{ backgroundColor: "primaryContainer.paper" }}>
    <FavoritesWidget id={0} iconSize="small" />
  </Paper>
);

function PinnedTodo() {
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  if (pinnedTodo === null) return null;
  const p = Tasks.find((p) => p.id === pinnedTodo);
  if (!p) return null;

  return (
    <Paper
      sx={{ backgroundColor: "primaryContainer.paper" }}
      className="w-[380px] h-[350px] overflow-hidden">
      <Todo {...p} />
    </Paper>
  );
}

function PinnedHabitTracker() {
  const { trackers, pinned } = useSelector(
    (state: StateType) => state.habitTracker
  );
  if (!pinned) return null;
  const t = trackers.find((p) => p.id === pinned);
  if (!t) return null;
  return (
    <Paper
      sx={{ backgroundColor: "primaryContainer.paper" }}
      className="w-[380px] h-[150px] p-2">
      <HabitTracker {...t} />
    </Paper>
  );
}

export default Popup;
