import { useState } from "react";
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
import useBookmarks from "@/hooks/useBookmarks";
import BookmarkBreadcrumb from "@/components/bookmarks/breadcrumb";
import { findBookmark } from "@/utils/bookmark";
import BookmarkGrid from "@/components/bookmarks/grid";
import { changeCurrentFolder } from "@/redux/slice/bookmark";
import { SelectChangeEvent } from "@mui/material/Select";
import { changeFolderSize } from "@/redux/slice/bookmark";
import { folderSizes } from "@/types/slice/bookmark";

function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const fetchBookmarks = () => {
    chrome.bookmarks.getTree().then((data) => {
      setBookmarks(data);
    });
  };

  useBookmarks(fetchBookmarks);
  if (!bookmarks || bookmarks.length === 0) return <ThemeSwitch />;
  return (
    <Sidebar
      showButton
      resizableBoxProps={{
        children: (
          <ScrollArea className="overflow-x-hidden h-screen px-4 bg-primary-1">
            <FavButton />
            <BookmarkTree bookmarks={bookmarks} />
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
      containerProps={{ className: "size-full h-screen" }}
      contentContainerProps={{ className: "h-screen gap-0 pl-4" }}
      children={<MainBookmarks bookmarks={bookmarks} />}
    />
  );
}

function BookmarkSizeSelect() {
  const { folderSize } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(changeFolderSize(event.target.value as folderSizes));
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

function MainBookmarks({ bookmarks }: BookmarkTree) {
  const { currentFolderID, folderSize, showFavorites, favorites } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => dispatch(changeCurrentFolder(id));

  const getBookmarks = () => {
    if (showFavorites) {
      const fav = favorites.map((id) => findBookmark(bookmarks, id));
      return fav.filter((id) => !!id);
    }
    return findBookmark(bookmarks, currentFolderID)?.children;
  };
  const currentBookmarks = getBookmarks();
  const props = { currentFolderID, folderSize, bookmarks, onFolderChange };

  return (
    <ScrollArea className="size-full pb-8">
      <div className="p-4">
        {showFavorites ? "Favorites" : <BookmarkBreadcrumb {...props} />}
      </div>
      <BookmarkGrid {...props} bookmarks={currentBookmarks || []} />
    </ScrollArea>
  );
}

export default BookmarkManager;
