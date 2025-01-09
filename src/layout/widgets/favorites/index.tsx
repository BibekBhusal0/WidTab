import BookmarkGrid from "@/components/bookmarks/grid";
import { ScrollArea } from "@/components/scrollarea";
import { useFavoriteBookmarks } from "@/hooks/useBookmarks";
import { setFavorites } from "@/redux/slice/bookmark";
import { FavoritesWidgetType } from "@/types/slice/bookmark";
import { reorderFavorites } from "@/utils/bookmark";
import { useDispatch } from "react-redux";

function Favorites({ iconSize }: FavoritesWidgetType) {
  const favorites = useFavoriteBookmarks();
  const dispatch = useDispatch();
  if (favorites.length === 0)
    return <div className="text-center text-xl p-2">No Favorites</div>;
  return (
    <ScrollArea className="size-full">
      <div className="py-2">
        <BookmarkGrid
          bookmarks={favorites}
          folderSize={iconSize}
          contextMenu={false}
          onReorder={(...props) =>
            dispatch(setFavorites(reorderFavorites(...props)))
          }
        />
      </div>
    </ScrollArea>
  );
}

export default Favorites;
