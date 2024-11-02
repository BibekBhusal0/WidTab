import BookmarkGrid from "@/components/bookmarks/grid";
import { ScrollArea } from "@/components/scrollarea";
import { useFavoriteBookmarks } from "@/hooks/useBookmarks";
import { FavoritesWidgetType } from "@/types/slice/bookmark";

function Favorites({ iconSize }: FavoritesWidgetType) {
  const favorites = useFavoriteBookmarks();
  if (favorites.length === 0)
    return <div className="text-center text-xl p-2">No Favorites</div>;
  return (
    <ScrollArea className="size-full">
      <BookmarkGrid bookmarks={favorites} folderSize={iconSize} />
    </ScrollArea>
  );
}

export default Favorites;
