import BookmarkGrid from "@/components/bookmarks/grid";
import { useFavoriteBookmarks } from "@/hooks/useBookmarks";
import { FavoritesWidgetType } from "@/types/slice/bookmark";

function Favorites({ iconSize }: FavoritesWidgetType) {
  const favorites = useFavoriteBookmarks();
  if (favorites.length === 0)
    return <div className="text-center text-xl">No Favorites</div>;
  return <BookmarkGrid bookmarks={favorites} folderSize={iconSize} />;
}

export default Favorites;
