import Sidebar from "@/components/sidebar";
import BookmarkTree from "@/components/bookmarks/tree";
import ThemeSwitch from "@/theme/switch";
import SelectSize from "@/components/bookmarks/size";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { toggleShowFavorites } from "@/redux/slice/bookmark";
import { ScrollArea } from "@/components/scrollarea";
import BookmarkSearch from "@/components/bookmarks/search";
import { useBookmarkFolder, useFavoriteBookmarks } from "@/hooks/useBookmarks";
import BookmarkBreadcrumb from "@/components/bookmarks/breadcrumb";
import BookmarkGrid from "@/components/bookmarks/grid";
import { changeCurrentFolder } from "@/redux/slice/bookmark";
import { SelectChangeEvent } from "@mui/material/Select";
import { changeFolderSize } from "@/redux/slice/bookmark";
import { allFolderSizes, folderSizes } from "@/types/slice/bookmark";

function BookmarkManager() {
  return (
    <Sidebar
      showButton
      resizableBoxProps={{
        children: (
          <ScrollArea className="h-full bg-primary-1">
            <FavButton />
            <BookmarkTree />
          </ScrollArea>
        ),
      }}
      headerProps={{ className: "h-20" }}
      header={
        <>
          <BookmarkSearch />
          <ThemeSwitch />
          <BookmarkSizeSelect />
        </>
      }
      containerProps={{ className: "size-full h-full" }}
      contentContainerProps={{ className: "h-full gap-0 pl-4" }}
      children={<MainBookmarks />}
    />
  );
}

function BookmarkSizeSelect() {
  const { folderSize } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value as folderSizes;
    if (allFolderSizes.includes(val)) {
      dispatch(changeFolderSize(val));
    }
  };
  return <SelectSize value={folderSize} onChange={handleChange} />;
}

function FavButton() {
  const dispatch = useDispatch();
  const { showFavorites } = useSelector((state: StateType) => state.bookmarks);
  return (
    <div className="flex-center w-full">
      <Button
        sx={{ marginX: "auto", marginY: "1rem" }}
        className="transition-all"
        variant={showFavorites ? "outlined" : "contained"}
        onClick={() => dispatch(toggleShowFavorites())}>
        <div className="text-xl flex-center gap-2">
          <Icon icon="mdi:heart-outline" />
          <div>{showFavorites ? "Hide " : "Show "} All Favorites</div>
        </div>
      </Button>
    </div>
  );
}

function MainBookmarks() {
  const { currentFolderID, showFavorites } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => dispatch(changeCurrentFolder(id));
  const props = { currentFolderID, onFolderChange };

  return (
    <>
      <div className="p-4">
        {showFavorites ? "Favorites" : <BookmarkBreadcrumb {...props} />}
      </div>
      <ScrollArea>
        {showFavorites ? <BookmarksFavorite /> : <BookmarksFolder />}
        <div className="py-2"></div>
      </ScrollArea>
    </>
  );
}

function BookmarksFolder() {
  const { currentFolderID } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const bookmarks = useBookmarkFolder(currentFolderID);
  return <OnlyBookmarks bookmarks={bookmarks} />;
}
function BookmarksFavorite() {
  const fav = useFavoriteBookmarks();
  return <OnlyBookmarks bookmarks={fav} />;
}

function OnlyBookmarks({ bookmarks }: BookmarkTree) {
  const { folderSize } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => dispatch(changeCurrentFolder(id));
  const props = { folderSize, bookmarks, onFolderChange };

  return <BookmarkGrid {...props} />;
}

export default BookmarkManager;
