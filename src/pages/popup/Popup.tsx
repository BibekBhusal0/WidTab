import BookmarkGrid from "@/components/bookmarks/grid";
import { ScrollArea } from "@/components/scrollarea";
import { useFavoriteBookmarks } from "@/hooks/useBookmarks";
import HabitTracker from "@/layout/widgets/habit-tracker";
import Todo from "@/layout/widgets/todo";
import { useBookmarkState, useHabitTracker, useTodo } from "@/storage";
import { cn } from "@/utils/cn";
import Paper from "@mui/material/Paper";

function Popup() {
  const { pinnedTodo } = useTodo();
  const { pinned } = useHabitTracker();
  const { favorites } = useBookmarkState();
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
        <div className="flex-grow text-xl text-center">
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

function Favorites() {
  const favorites = useFavoriteBookmarks();

  return (
    <Paper
      className="h-full w-[350px] relative"
      sx={{ backgroundColor: "primaryContainer.paper" }}>
      <ScrollArea className="size-full">
        <div className="py-4 px-1">
          <BookmarkGrid
            bookmarks={favorites}
            // openLinkInNewTab={true}
            contextMenu={false}
          />
        </div>
      </ScrollArea>
    </Paper>
  );
}

function PinnedTodo() {
  const { Tasks, pinnedTodo } = useTodo();
  if (pinnedTodo === null) return null;
  const p = Tasks.find((p) => p.id === pinnedTodo);
  if (!p) return null;

  return (
    <Paper
      sx={{ backgroundColor: "primaryContainer.paper" }}
      className="w-[380px] h-[350px]">
      <Todo {...p} />
    </Paper>
  );
}

function PinnedHabitTracker() {
  const { trackers, pinned } = useHabitTracker();
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
